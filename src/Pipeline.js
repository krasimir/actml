import execute from './middlewares/execute';
import processResult from './middlewares/processResult';
import processChildren from './middlewares/processChildren';

export default function Pipeline(element) {
  if (!element) {
    throw new Error('A Pipeline can not be created with no Element.');
  }
  const middlewares = [];
  const pipeline = function(middleware, result) {
    const entry = pipeline.find(middleware);

    entry.enabled = false;
    return entry.func({ ...element, result });
  }

  pipeline.add = function add(func, name) {
    middlewares.push({ name, func, enabled: true });
  }
  pipeline.find = function (n) {
    const entry = middlewares.find(({ name }) => name === n);

    if (entry) {
      return entry;
    } else {
      throw new Error(`Sorry, there is no pipeline entry with name "${ n }"`);
    }
  };
  pipeline.disable = function (name) {
    this.find(name).enabled = false;
  };
  pipeline.enable = function (name) {
    this.find(name).enabled = true;
  };
  pipeline.process = async function () {
    let entry;
    let pointer = 0;

    while(entry = middlewares[pointer]) {
      if (entry.enabled) {
        await entry.func(element);
      }
      pointer += 1;
    }
    return element.result;
  };

  return pipeline;
}

Pipeline.execute = execute;
Pipeline.processResult = processResult;
Pipeline.processChildren = processChildren;

export function createDefaultPipeline(element) {
  const pipeline = Pipeline(element);

  pipeline.add(execute);
  pipeline.add(processResult, 'result');
  pipeline.add(processChildren, 'children');

  return pipeline;
}