/** @jsx dialect */
import { dialect, speak } from '../';

describe('Given the Dialectica library', () => {
  describe('when running a simple function', () => {
    it('should execute the function with the given params and return the result', () => {
      const Func = jest.fn(({ foo }) => foo * 2);
      const Word = <Func foo={ 10 }/>;
      const result = speak(Word);

      expect(Func).toBeCalledWith({ foo: 10 });
      expect(result).toBe(20);
    });
    it(`should execute the function with the given merged params
        return the result even if we use it as a tag`, () => {
      const Func = jest.fn(({ foo, bar }) => foo * bar);
      const Word = <Func foo={ 10 }/>;
      const result = speak(<Word bar={ 20 }/>);

      expect(Func).toBeCalledWith({ foo: 10, bar: 20 });
      expect(result).toBe(200);
    });
  });
  describe('when having nested functions', () => {
    it('should run all of them and return the result', () => {
      const Foo = jest.fn();
      const Bar = jest.fn();
      const Zar = jest.fn();
      const language = <Foo><Bar><Zar /></Bar></Foo>;
      const result = speak(language);

      expect(Foo).toBeCalled();
      expect(Bar).toBeCalled();
      expect(Zar).toBeCalled();
    });
  });
  describe('when using FACC pattern', () => {
    it('should pass down the result of the function as param for the FACC', () => {
      const Foo = jest.fn(() => 42);
      const Bar = jest.fn();
      const language = <Foo>{ answer => <Bar answer={ answer } /> }</Foo>;
      const result = speak(language);

      expect(Foo).toBeCalled();
      expect(Bar).toBeCalledWith({ answer: 42 });
    });
  });
});