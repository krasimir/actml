/* eslint-disable max-len, no-use-before-define */

import { flow } from '../utils';
import beforeHook from './beforeHook';
import afterHook from './afterHook';
import normalizeProps from './normalizeProps';
import execute from './execute';
import resolveExports from './resolveExports';
import attemptToProcessChildren from './attemptToProcessChildren';
import defineChildrenProp from './defineChildrenProp';

const DEBUG_ENABLED = false;

function identifyTheError(error, sourceElement) {
  if (error.toString().match(/children is not a function/)) {
    return new Error(`You are trying to use "children" prop as a function in <${ sourceElement }> but it is not. Did you forget to wrap its children in round brackets. Like for example <${ sourceElement }>(<Child />)</${ sourceElement }>?`);
  }
  return error;
}

export default class Processor {
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
  elementProcessed(task) {
    const { id } = task;

    if (this.queue[id]) {
      delete this.queue[id];
    } else {
      throw new Error('The processor just finished queue an element but it is already removed from the list.');
    }

    this.debug('<-', task.element);

    if (task.done) {
      task.done(task.result);
    }

    // exit if we don't have any more elements to process
    if (Object.keys(this.queue).length === 0) {
      this.exit(null, task.result);
    }
  }
  createProcessorErrorHandler(element) {
    return (error, continueFlow, stopFlow) => {
      this.debug('!', element, error.message);

      const Handler = element.handleError(error);

      if (Handler) {
        this.add(Handler, element, continueFlow);
      } else {
        stopFlow(identifyTheError(error, element.name));
      }
    };
  }
  add(element, parent, done) {
    const task = {
      id: this.ids++,
      element: element.initialize(parent),
      parent,
      done,
      result: undefined,
      processor: this
    };
    const onProcessingFinished = (error) => error ? this.exit(error) : this.elementProcessed(task, task);

    this.queue[task.id] = task;
    this.debug('->', element);

    flow(
      [
        beforeHook,
        normalizeProps,
        defineChildrenProp,
        execute,
        resolveExports,
        attemptToProcessChildren,
        afterHook
      ],
      task,
      onProcessingFinished,
      this.createProcessorErrorHandler(element)
    );
  }
}
