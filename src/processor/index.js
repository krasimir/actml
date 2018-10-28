/* eslint-disable max-len, no-use-before-define */

import { flow } from '../utils';
import beforeHook from './beforeHook';
import afterHook from './afterHook';
import normalizeProps from './normalizeProps';
import execute from './execute';
import resolveExports from './resolveExports';
import processChildren from './processChildren';
import defineChildrenProp from './defineChildrenProp';

const DEBUG_ENABLED = false;

function identifyTheError(error, sourceElement) {
  if (error.toString().match(/children is not a function/)) {
    return new Error(`You are trying to use "children" prop as a function in <${ sourceElement }> but it is not. Did you forget to wrap its children in round brackets. Like for example <${ sourceElement }>(<Child />)</${ sourceElement }>?`);
  }
  return error;
}

class Processor {
  constructor(done) {
    this.ids = 0;
    this.onFinish = done;
    this.queue = {};
  }
  exit(error, result) {
    this.debug(`(|) exit | error: ${ error ? 'yes' : 'no' }`);
    this.queue = [];
    this.onFinish(error, result);
    this.onFinish = () => {};
  }
  debug(whatHappened, element, ...reset) {
    if (DEBUG_ENABLED) {
      console.log(`
        ${ whatHappened } ${ element ? element.name : '' } | queue: ${ Object.keys(this.queue).length }
      `, ...reset);
    }
  }
  elementProcessed(task, executionContext) {
    const { id } = task;

    if (this.queue[id]) {
      delete this.queue[id];
    } else {
      throw new Error('The processor just finished queue an element but it is already removed from the list.');
    }

    this.debug('<-', task.element);

    if (task.done) {
      task.done(executionContext.result);
    }

    // exit if we don't have any more elements to process
    if (Object.keys(this.queue).length === 0) {
      this.exit(null, executionContext.result);
    }
  }
  createTask(element, parent, done) {
    return { element, parent, id: this.ids++, done };
  }
  processElement(task) {
    this.queue[task.id] = task;

    const { element, parent } = task;
    const executionContext = {
      element: element.initialize(parent),
      result: undefined,
      processor: this
    };

    this.debug('->', element);

    flow(
      [
        beforeHook,
        normalizeProps,
        defineChildrenProp,
        execute,
        resolveExports,
        function atemptToProcessChildren(execContext, done, addNewWorker) {
          if (!execContext.childrenProp) {
            addNewWorker(processChildren);
          }
          done();
        },
        afterHook
      ],
      executionContext,
      (error) => {
        if (error) {
          this.exit(error);
        } else {
          this.elementProcessed(task, executionContext);
        }
      },
      (error, continueFlow, stopFlow) => {
        this.debug('!', element, error.message);

        const Handler = element.handleError(error);

        if (Handler) {
          this.add(Handler, element, continueFlow);
        } else {
          stopFlow(identifyTheError(error, element.name));
        }
      }
    );
  }
  add(element, parent, done) {
    this.processElement(this.createTask(element, parent, done));
  }
}

export function createProcessor(done) {
  return new Processor(done);
}
