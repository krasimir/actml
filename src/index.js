import ReactReconciler from 'react-reconciler';
import * as scheduler from 'scheduler';

var id = 0;
const getId = () => ++id;
const createActor = () => {
  return {
    id: 'a' + getId()
  };
};

const log = (...args) => {
  console.log(...args);
};
const { unstable_now: now } = scheduler;
const HostConfig = {
  now,
  getRootHostContext: function (rootInstance) {
    log('getRootHostContext', rootInstance);
    return { rootHostContext: 'yes' };
  },
  getChildHostContext: function (parentHostContext, type, rootInstance) {
    log('getChildHostContext', parentHostContext, type, rootInstance);
    return { childHostContext: 'yes' };
  },
  shouldSetTextContent: function (type, props) {
    log('shouldSetTextContent', type, props);
  },
  createTextInstance: function (text, rootContainerInstance, internalInstanceHandle) {
    log('createTextInstance', text, rootContainerInstance, internalInstanceHandle);
  },
  createInstance: function (type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
    log('createInstance', type, props, rootContainerInstance, hostContext, internalInstanceHandle);
  },
  appendInitialChild: function (parentInstance, child) {
    log('appendInitialChild', parentInstance, child);
  },
  finalizeInitialChildren: function (domElement, type, props, rootContainerInstance, hostContext) {
    log('finalizeInitialChildren', domElement, type, props, rootContainerInstance, hostContext);
  },
  prepareForCommit: function (containerInfo) {
    log('prepareForCommit', containerInfo);
  },
  resetAfterCommit: function (containerInfo) {
    log('resetAfterCommit', containerInfo);
  },
  appendChildToContainer: function (parentInstance, child) {
    log('appendChildToContainer', parentInstance, child);
  },
  getPublicInstance(inst) {
    log('getPublicInstance', inst);
    return inst;
  },
  prepareUpdate(domElement, type, oldProps, newProps, rootContainerInstance, hostContext) {
    log('prepareUpdate', domElement, type, oldProps, newProps, rootContainerInstance, hostContext);
    // return shallowDiff(oldProps, newProps);
  },
  appendChild(parentInstance, child) {
    log('appendChild', parentInstance, child);
  },
  removeChildFromContainer(parentInstance, child) {
    log('removeChildFromContainer', parentInstance, child);
  },

  insertBefore(parentInstance, child, beforeChild) {
    log('insertBefore', parentInstance, child);
  },

  insertInContainerBefore(parentInstance, child, beforeChild) {
    log('insertInContainerBefore', parentInstance, child, beforeChild);
  },
  commitUpdate(domElement, updatePayload, type, oldProps, newProps, internalInstanceHandle) {
    log('commitUpdate', domElement, updatePayload, type, oldProps, newProps, internalInstanceHandle);
  },
  commitMount(domElement, type, newProps, internalInstanceHandle) {
    log('commitMount', domElement, type, newProps, internalInstanceHandle);
  },

  commitTextUpdate(textInstance, oldText, newText) {
    log('commitTextUpdate', textInstance, oldText, newText);
  },

  resetTextContent(domElement) {
    log('resetTextContent', domElement);
  },
  scheduleDeferredCallback: scheduler.unstable_scheduleCallback,
  cancelDeferredCallback: scheduler.unstable_cancelCallback,
  schedulePassiveEffects: scheduler.unstable_scheduleCallback,
  cancelPassiveEffects: scheduler.unstable_cancelCallback,
  supportsMutation: true,
  useSyncScheduling: true
};

const root = createActor();
const ReactReconcilerInst = ReactReconciler(HostConfig);
var rootContainer;

const render = function (func, callback) {
  log('render');
  if (!rootContainer) {
    rootContainer = ReactReconcilerInst.createContainer(root, false);
  }
  return ReactReconcilerInst.updateContainer(func, rootContainer, null, callback);
};

module.exports = {
  render
};

