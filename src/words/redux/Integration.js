const Integration = {
  _listeners: [],
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
