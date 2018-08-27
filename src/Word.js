export default class Word {
  constructor(func, params, children) {
    this.func = func;
    this.params = params;
    this.children = children;
    this.__D = true;
  }
  say(context) {
    if (Word.isItAWord(this.func)) {
      return this
        .func
        .mergeParams(this.params)
        .say(context);
    }
    return this
      .contextifyParams(context)
      .func(this.params);
  }
  mergeParams(params) {
    this.params = Object.assign({}, this.params, params);
    return this;
  }
  contextifyParams(context) {
    this.params && Object.keys(this.params).forEach(param => {
      if (context[param]) this.params[param] = context[param];
    });
    return this;
  }
  static isItAWord(word) {
    return word && word.__D === true;
  }
}