/** @jsx A */

import { A, run, Fragment, processor, useReducer, usePubSub, useState, useEffect } from '../';
import { delay, exerciseTree } from '../__helpers__/utils';

describe('Given the ActML library', () => {
  beforeEach(() => {
    processor.system().reset();
  });
  describe('when we use bunch of hooks', () => {
    it('should work :)', async () => {
      const reducer = (state, action) => {
        return state + 1;
      };
      const Computer = async function ({ children }) {
        const [ numOfKeyPressed, pressed ] = useReducer(reducer, 0);
        const { subscribe } = usePubSub();

        subscribe('keyup', (key) => {
          pressed(numOfKeyPressed() + 1);
        });
        children(numOfKeyPressed() + 1);
      };
      const Keyboard = function ({ children }) {
        const { subscribe, publish } = usePubSub();

        subscribe('hit', key => publish('keyup', key));
        return children;
      };
      const Button = function ({ timeout, letter }) {
        const { publish } = usePubSub();

        delay(timeout, () => publish('hit', letter));
      };
      const Print = jest.fn();

      const el = (
        <Fragment>
          <Computer exports='hits'>
            <Print $hits />
          </Computer>
          <Keyboard>
            <Button timeout={ 10 } letter='a' />
            <Button timeout={ 15 } letter='b' />
            <Button timeout={ 20 } letter='c' />
          </Keyboard>
        </Fragment>
      );

      await run(el);
      await delay(40);
      exerciseTree(processor, `
        Fragment(1)
        Computer(4)
        mockConstructor(4)
        Keyboard(1)
        Button(1)
        Button(1)
        Button(1)
      `);
      expect(Print).toBeCalledTimes(4);
    });
  });
  describe('when we have useState and useEffect together', () => {
    it('should work as expected', async () => {
      const values = [];
      const Counter = function ({ children }) {
        const [ value, setCounter ] = useState(0);

        children({ value: value(), update: () => setCounter(value() + 1) });
      };
      const Controls = function ({ update }) {
        useEffect(() => {
          setTimeout(() => update(), 10);
          setTimeout(() => update(), 20);
          setTimeout(() => update(), 25);
        }, []);
      };
      const PrintValue = ({ value }) => values.push(value);

      await run(
        <Counter>
          <PrintValue />
          <Controls />
        </Counter>
      );
      await delay(30);

      expect(values).toStrictEqual([ 0, 1, 2, 3 ]);
    });
  });
  describe('when we want to re-use elements even if the props change', () => {
    it('should work as expected', async () => {
      const mock = jest.fn();
      const Counter = function ({ children }) {

        children(() => {});
      };
      const Controls = function () {
        useEffect(() => {
          mock();
        }, []);
      };
      const el = (
        <Counter>
          {
            (fn) => <Controls fn={ fn }/>
          }
        </Counter>
      );

      await run(el);
      await run(el);

      await delay(50);
      expect(mock).toBeCalledTimes(1);
    });
  });
});
