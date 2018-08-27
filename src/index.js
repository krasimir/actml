class Word {
  constructor(func, params, children) {
    this.func = func;
    this.params = params;
    this.children = children;
    this.__D = true;
  }
  say(params) {
    if (Word.isItAWord(this.func)) {
      return this.func.say(this.params);
    }
    return this.func.call(this.func, Object.assign({}, this.params, params));
  }
  static isItAWord(word) {
    return word && word.__D === true;
  }
}

class Dialect {
  speak(word) {
    if (Word.isItAWord(word)) {
      let result;

      result = word.say();
      if (result && result['then']) {
        result
          .then(r => this._processChildren(word.children, r))
          .catch(error => {});
      } else {
        this._processChildren(word.children, result);
      }
      
      return result;
    }
  }
  create(func, params, ...children) {
    return new Word(func, params, children);
  }
  _processChildren(children, result) {
    if (children) {
      if (children.length === 1 && !Word.isItAWord(children[0])) {
        this.speak(children[0](result));
      } else {
        children.forEach(w => this.speak(w));
      }
    }
  }
}

const d = new Dialect();

export const dialect = d.create.bind(d);
export const speak = d.speak.bind(d);