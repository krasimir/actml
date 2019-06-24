/** @jsx A */

import { A, run, Fragment } from '../../';

const delay = (ms, func = () => {}) => new Promise(resolve => setTimeout(() => resolve(func()), ms));

describe('Given the usePubSub hook', () => {
  describe('when we subscribe to an event', () => {
    beforeEach(() => {
      const C = ({ usePubSub }) => {
        const { clear } = usePubSub();

        clear();
      };

      run(<C />);
    });
    it('should be possible to publish such one from another element', async () => {
      const mock = jest.fn();
      const Publisher = function ({ usePubSub }) {
        const { publish } = usePubSub();

        setTimeout(() => {
          publish('foo', 42);
        }, 30);
      };
      const S = function ({ usePubSub }) {
        const { subscribe } = usePubSub();

        subscribe('foo', mock);
      };

      await run(
        <Fragment>
          <S />
          <Publisher />
        </Fragment>
      );
      await delay(50);

      expect(mock).toBeCalledWith(
        42,
        expect.objectContaining({
          meta: expect.objectContaining({ name: 'Publisher' })
        })
      );
    });
    it('should subscribe only once', async () => {
      const mockS = jest.fn();
      const mockExecute = jest.fn();
      const E = function ({ usePubSub }) {
        const { subscribe } = usePubSub();

        mockExecute();
        subscribe('foo', mockS);
      };
      const P = function ({ usePubSub, useChildren }) {
        const { publish } = usePubSub();
        const [ children ] = useChildren();

        children();
        children();
        setTimeout(() => {
          children();
          publish('foo');
        }, 20);
      };

      await run(
        <P>
          <E />
        </P>
      );
      await delay(30);

      expect(mockExecute).toBeCalledTimes(3);
      expect(mockS).toBeCalledTimes(1);
    });
    it('should provide a way to unsubscribe', async () => {
      const mockS = jest.fn();
      const E = function ({ usePubSub }) {
        const { subscribe } = usePubSub();

        const unsubscribe = subscribe('foo', mockS);

        setTimeout(unsubscribe, 20);
      };
      const P = function ({ usePubSub }) {
        const { subscribers } = usePubSub();

        expect(Object.keys(subscribers['foo'])).toHaveLength(1);
        setTimeout(() => {
          expect(Object.keys(subscribers['foo'])).toHaveLength(0);
        }, 30);
      };

      await run(
        <Fragment>
          <E />
          <P />
        </Fragment>
      );
      await delay(40);
    });
  });
});
