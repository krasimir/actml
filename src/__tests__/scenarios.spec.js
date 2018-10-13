/** @jsx A */
import { A, run } from '..';

describe('Given the ActML library', () => {
  describe('when we have a FACC that returns raw data', () => {
    it('should present the data at the exit', async () => {
      async function GetData({ children }) {
        return children([{ n: 2 }, { n: 4 }]);
      }
      function Get() {
        return (
          <GetData exports='arr'>
            {data => {
              return data.map(({ n }) => n + 1);
            }}
          </GetData>
        );
      }

      const { arr } = await run(<A><Get /></A>);

      expect(arr).toStrictEqual([ 3, 5 ]);
    });
  });
});