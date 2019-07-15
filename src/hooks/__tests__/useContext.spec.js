/** @jsx A */

import { A, run, createContext, useContext } from '../../';

describe('Given the ActML library', () => {
  describe('when using the useContext hook', () => {
    it('should access the value of the context', () => {
      const Context = createContext();
      const mock = jest.fn();
      const F = () => {
        const value = useContext(Context);

        mock(value);
      };

      run(
        <Context.Provider value='foo'>
          <F />
        </Context.Provider>
      );

      expect(mock).toBeCalledWith('foo');
    });
  });
});
