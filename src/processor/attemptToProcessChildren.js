import processChildren from './processChildren';

export default function attemptToProcessChildren(execContext, done, addNewWorker) {
  if (!execContext.childrenProp) {
    addNewWorker(processChildren);
  }
  done();
}
