import React from 'react';
import ActML from '../index';

const noop = () => jest.fn().mockImplementation(() => null);

describe('Given the ActML custom renderer', () => {
  describe('when passing an ActML element', () => {
    it('should run the function', () => {
      const A = noop();

      ActML.render(<A foo='bar' />);

      expect(A).toBeCalledWith({ foo: 'bar' }, {});
    });
  });
  describe('when having nested elements', () => {
    it.only('should call the functions too', () => {
      const A = noop();
      const B = noop();
      const C = noop();

      ActML.render(
        <A>
          <B>Hello world</B>
          <C></C>
        </A>
      );

      expect(A).toBeCalled();
      expect(B).toBeCalled();
      expect(C).toBeCalled();
    });
  });
});
