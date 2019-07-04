/* eslint-disable no-unused-vars */
/** @jsx A */

import { A, run, Fragment, processor, usePubSub } from '../../';
import { delay, prettyTree } from '../../__helpers__/utils';

describe('Given the usePubSub hook', () => {
  beforeEach(() => {
    processor.system().reset();
  });
  describe('when we subscribe to an event', () => {
    it('should be possible to publish such one from another element', async () => {
      const mock = jest.fn();
      const Publisher = function () {
        const { publish } = usePubSub();

        setTimeout(() => {
          publish('foo', 42);
        }, 30);
      };
      const S = function () {
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
          name: 'Publisher'
        })
      );
    });
    it('should provide a way to unsubscribe', async () => {
      const mockS = jest.fn();
      const E = function () {
        const { subscribe } = usePubSub();

        const unsubscribe = subscribe('foo', mockS);

        setTimeout(unsubscribe, 20);
      };
      const P = function () {
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
