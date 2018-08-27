const DIALECT_TYPE = '__dialect';

class Word {
  constructor(func, params, children) {
    this.func = func;
    this.params = params;
    this.children = children;
    this[DIALECT_TYPE] = true;
  }
  say(params) {
    if (Word.isItAWord(this.func)) {
      return this.func.say(this.params);
    }
    return this.func.call(this.func, Object.assign({}, this.params, params));
  }
  static isItAWord(word) {
    return word && word[DIALECT_TYPE] === true;
  }
}

class Dialect {
  speak(word) {
    if (Word.isItAWord(word)) {
      let result;

      result = word.say();

      if (word.children) {
        if (word.children.length === 1 && !Word.isItAWord(word.children[0])) {
          this.speak(word.children[0](result));
        } else {
          word.children.forEach(w => this.speak(w));
        }
      }
      return result;
    }
  }
  create(func, params, ...children) {
    return new Word(func, params, children);
  }
}

const d = new Dialect();

export const dialect = d.create.bind(d);
export const speak = d.speak.bind(d);