const MIDDLEWARE_NOT_RUN = `There are two possible options for this error:
a) You are running your ActML logic too soon. The Redux middleware is still not registered.
b) You forgot to register ActML's Redux middleware.`;

const Integration = {
  _listeners: [],
  getState() {
    throw new Error(MIDDLEWARE_NOT_RUN);
  },
  dispatch() {
    throw new Error(MIDDLEWARE_NOT_RUN);
  },
  addListener(callback) {
    this._listeners.push(callback);

    const index = this._listeners.length - 1;

    return () => this._listeners.splice(index, 1);
  },
  actionDetected(action) {
    this._listeners.forEach(l => l(action));
  },
  reset() {
    this._listeners = [];
  }
}

export default Integration;
