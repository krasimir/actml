import Word from './Word';

export default class Dialect {
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
      return context;
    } else {
      throw new Error('Unexpected word! word = ' + word);
    }
  }
  create(func, params, ...children) {
    return new Word(func, params, children);
  }
}