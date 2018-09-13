const Integration = {
  _listeners: [],
  addListener(callback) {
    this._listeners.push(callback);
  },
  actionDetected(action) {
    this._listeners.forEach(l => l(action));
  }
}

export default Integration;
