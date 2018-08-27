class Word {
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

class Dialect {
  async speak(word, context = {}) {
    if (Word.isItAWord(word)) {
      var result = await word.say(context);

      // registering exports in the current context
      if (word.params && word.params['exports']) {
        context[word.params.exports] = result;
      }

      if (word.children && word.children.length > 0) {
        let pointer = 0;
        let self = this;
        async function process(w) {
          await self.speak(w, context);
          if (++pointer < word.children.length) {
            return process(word.children[pointer]);
          }
        }
        await process(word.children[0]);
      }
    } else {
      throw new Error('Unexpected word! word = ' + word);
    }
  }
  create(func, params, ...children) {
    return new Word(func, params, children);
  }
}

const d = new Dialect();

export const dialect = d.create.bind(d);
export const speak = d.speak.bind(d);