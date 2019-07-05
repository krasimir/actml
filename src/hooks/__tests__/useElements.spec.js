/** @jsx A */

import { A, run, useElements, Fragment } from '../../';

describe('Given the ActML library', () => {
  describe('when use the Publish and Subscribe elements', () => {
    it('should allow us to use usePubSub hook', async () => {
      const mock = jest.fn();
      const B = () => {
        const { Subscribe } = useElements();

        return (
          <Subscribe type='foo'>
            { mock }
          </Subscribe>
        );
      };
      const C = () => {
        const { Publish } = useElements();

        return <Publish type='foo' payload={ { 'bar': 10 } } />;
      };

      await run(
        <Fragment><B /><C /></Fragment>
      );

      expect(mock).toBeCalledWith(
        { bar: 10 }
      );
    });
  });
});
