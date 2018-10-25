/** @jsx A */
import { A, run } from '../../';

describe('Given the A element', () => {
  describe('when using the wrapper <A />', () => {
    it('should work just fine :)', async () => {
      const F = jest.fn().mockImplementation(() => 42);
      const M = jest.fn();

      const result = await run(<A><F exports='answer'><M $answer /></F></A>);

      expect(F).toBeCalled();
      expect(M).toBeCalledWith(expect.objectContaining({ answer: 42 }));
    });
    it('should scope everything by default', async () => {
      const F = jest.fn().mockImplementation(() => 42);
      const M = jest.fn();

      const result = await run(
        <A>
          <F exports='foo' />
          <F exports='bar' />
          <A>
            <A>
              <M $foo $bar />
            </A>
          </A>
        </A>
      );

      expect(M).toBeCalledWith(expect.objectContaining({ foo: 42, bar: 42 }));
    });
    it('should return that bit of the scope which is passed to the `result` prop', async () => {
      const F = jest.fn().mockImplementation(() => 42);
      const D = jest.fn().mockImplementation(({ foo }) => foo * 2);
      const M = function () {
        return (
          <A result='bar'>
            <F exports='foo' />
            <D exports='bar' $foo/>
          </A>
        );
      };

      const result = await run(<M />);

      expect(result).toEqual(84);
    });
  });
});
