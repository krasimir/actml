export const ReduxIntegration = {
  _listeners: [],
  addListener(callback) {
    this._listeners.push(callback);
  },
  actionDetected(action) {
    this._listeners.forEach(l => l(action));
  }
}