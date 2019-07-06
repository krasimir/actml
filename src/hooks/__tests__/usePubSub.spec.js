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

      expect(mock).toBeCalledWith(42);
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
    it('should remove the subscriptions if the element is removed', async () => {
      const mockS = jest.fn();
      let i = 0;
      const E = function () {
        const { subscribe } = usePubSub();

        subscribe('foo', () => {});
      };
      const P = function () {
        i += 1;
        if (i > 1) {
          return null;
        }
        return <E />;
      };
      const Exp = () => {
        const { subscribers } = usePubSub();

        if (i === 1) {
          expect(Object.keys(subscribers.foo)).toHaveLength(1);
        } else {
          expect(Object.keys(subscribers.foo)).toHaveLength(0);
        }
      };
      const C = () => (
        <Fragment>
          <P />
          <Exp />
        </Fragment>
      );

      const el = <C />;

      await run(el);
      await run(el);

    });
  });
  describe('when use the Publish and Subscribe elements', () => {
    it('should allow us to use usePubSub hook', async () => {
      const mock = jest.fn();
      const B = () => {
        const { Subscribe } = usePubSub();

        return (
          <Subscribe type='foo'>
            { mock }
          </Subscribe>
        );
      };
      const C = () => {
        const { Publish } = usePubSub();

        return <Publish type='foo' payload={ { 'bar': 10 } } />;
      };

      await run(
        <Fragment><B /><C /></Fragment>
      );

      expect(mock).toBeCalledWith(
        { payload: { bar: 10 } }
      );
    });
  });
});
