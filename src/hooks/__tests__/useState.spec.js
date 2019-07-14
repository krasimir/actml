/** @jsx A */

import { A, run, processor, useState } from '../../';
import { delay } from '../../__helpers__/utils';

describe('Given the ActML library', () => {
  beforeEach(() => {
    processor.system().reset();
  });
  describe('when use the useState hook', () => {
    it('should allow us to preserve state across reruns', () => {
      const mock = jest.fn();
      const E = () => {
        const [ state, setState ] = useState(1);

        setState(state() + 1);
        mock(state());
      };
      const el = <E />;

      run(el);
      run(el);
      run(el);

      expect(mock).toBeCalledTimes(3);
      expect(mock).toBeCalledWith(2);
      expect(mock).toBeCalledWith(3);
      expect(mock).toBeCalledWith(4);
    });
    it('should allow us to keep multiple states', async () => {
      const mock = jest.fn();
      const E = () => {
        const [ numbers, increment ] = useState(0);
        const [ letters, addLetter ] = useState('');

        increment(numbers() + 1);
        addLetter(letters() + 'a');
        mock(numbers(), letters());
      };
      const el = <E />;

      await run(el);
      await run(el);
      await run(el);

      expect(mock).toBeCalledTimes(3);
      expect(mock).toBeCalledWith(1, 'a');
      expect(mock).toBeCalledWith(2, 'aa');
      expect(mock).toBeCalledWith(3, 'aaa');
    });
    it('should re-run the function if we call setState', async () => {
      const mock = jest.fn();
      const E = ({ children }) => {
        const [ numbers, increment ] = useState(1);

        if (numbers() === 1) {
          setTimeout(() => {
            increment(numbers() + 1);
          }, 20);
        }
        mock(numbers());
        return children;
      };
      const C = jest.fn();
      const el = <E><C /></E>;

      run(el);
      await delay(30);

      expect(mock).toBeCalledTimes(2);
      expect(mock).toBeCalledWith(1);
      expect(mock).toBeCalledWith(2);
      expect(C).toBeCalledTimes(2);
    });
    it('should get the state immediately', async () => {
      const mock = jest.fn();
      const E = () => {
        const [ numbers, increment ] = useState(1);
        const [ letters, addLetter ] = useState('a');

        increment(increment(increment(numbers() + 1) + 1) + 1);
        addLetter(addLetter(addLetter(letters() + 'a') + 'a') + 'a');
        mock(numbers(), letters());
      };

      await run(<E />);

      expect(mock).toBeCalledTimes(1);
      expect(mock).toBeCalledWith(4, 'aaaa');
    });
  });
  describe('when we use useState hook and the element is still running', () => {
    it('should schedule an update after the processing is done', () => {
      const mock = jest.fn();
      const Trip = ({ children }) => {
        const [ budget, update ] = useState(250);

        children({ budget, update });
      };
      const Expenses = ({ budget, amount, update }) => {
        update(budget() - amount);
      };
      const Print = ({ budget }) => mock(budget());

      run(
        <Trip>
          <Expenses amount={ 40 } />
          <Expenses amount={ 10 } />
          <Expenses amount={ 1 } />
          <Print />
        </Trip>
      );

      expect(mock).toBeCalledWith(199);
    });
  });
});
