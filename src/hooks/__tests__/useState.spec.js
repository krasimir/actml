/** @jsx A */

import { A } from '../../';

describe('Given the ActML library', () => {
  describe('when use the useState hook', () => {
    it('should allow us to preserve state across reruns', async () => {
      const mock = jest.fn();
      const E = ({ useState }) => {
        const [ state, setState ] = useState(1);

        setState(state + 1);
        // the state at this point is updated but not delivered
        mock(state);
      };
      const El = <E />;

      await El.run();
      await El.run();
      await El.run();

      expect(mock).toBeCalledTimes(3);
      expect(mock).toBeCalledWith(1);
      expect(mock).toBeCalledWith(2);
      expect(mock).toBeCalledWith(3);
    });
    it('should allow us to keep multiple states', async () => {
      const mock = jest.fn();
      const E = ({ useState }) => {
        const [ numbers, increment ] = useState(1);
        const [ letters, addLetter ] = useState('a');

        increment(numbers + 1);
        addLetter(letters + 'a');
        mock(numbers, letters);
      };
      const El = <E />;

      await El.run();
      await El.run();
      await El.run();

      expect(mock).toBeCalledTimes(3);
      expect(mock).toBeCalledWith(1, 'a');
      expect(mock).toBeCalledWith(2, 'aa');
      expect(mock).toBeCalledWith(3, 'aaa');
    });
  });
});
