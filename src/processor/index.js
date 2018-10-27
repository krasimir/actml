/* eslint-disable max-len, no-use-before-define */

import { flow } from '../utils';
import beforeHook from './beforeHook';
import afterHook from './afterHook';
import normalizeProps from './normalizeProps';
import execute from './execute';
import resolveExports from './resolveExports';
import processChildren from './processChildren';

function identifyTheError(error, sourceElement) {
  if (error.toString().match(/children is not a function/)) {
    return new Error(`You are trying to use "children" prop as a function in <${ sourceElement }> but it is not. Did you forget to wrap its children in round brackets. Like for example <${ sourceElement }>(<Child />)</${ sourceElement }>?`);
  }
  return error;
}

export function createProcessor(done) {
  var ids = 0;
  var running = false;
  const onFinish = done;
  const bucket = [];
  const processing = {};
  const processor = {
    add(element, parent, done) {
      bucket.push(createTask(element, parent, done));
      if (!running) {
        processElement(bucket.shift());
      }
    }
  };

  const elementProcessed = function (task, executionContext) {
    const { id } = task;

    if (processing[id]) {
      // console.log(`Processor: removing ${ task.element.name } from processing`);
      delete processing[id];
    } else {
      throw new Error('The processor just finished processing an element but it is already removed from the list.');
    }

    if (task.done) {
      task.done(executionContext.result);
    }

    // exit if we don't have any more elements to process
    if (Object.keys(processing).length === 0 && bucket.length === 0) {
      onFinish(executionContext.result);
    }
  };
  const processElement = function (task) {
    processing[task.id] = task;

    const { element, parent } = task;
    const executionContext = {
      element: element.initialize(parent),
      result: undefined,
      processor
    };

    flow(
      [
        beforeHook,
        normalizeProps,
        execute,
        resolveExports,
        (execContext, done) => execContext.normalizedProps.children ? done() : processChildren(execContext, done),
        afterHook
      ],
      executionContext,
      () => elementProcessed(task, executionContext),
      (error, continueProcessing) => {
        const { props } = element;
        const identifiedError = identifyTheError(error, element.name);

        if (props && props.onError) {
          props.onError.mergeToProps({ error });
          this.add(props.onError, element);
        } else {
          throw identifiedError;
        }
      }
    );
  };
  const createTask = function (element, parent, done) {
    return { element, parent, id: ids++, done };
  };

  return processor;
}
