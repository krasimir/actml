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
  describe('when we have a FACC that returns a generator with elements', () => {
    it('should continue processing the elements from the generator', async () => {
      async function GetData({ children }) {
        return children([{ n: 2 }, { n: 4 }]);
      }
      function TransformData({ data }) {
        return data.map(({ n }) => n + 1);
      }
      function Get() {
        return (
          <GetData exports='arr'>
            {
              function * (data) {
                const result = yield <TransformData data={ data } />;

                return result.map(a => a*2);
              }
            }
          </GetData>
        );
      }

      const { arr } = await run(<A><Get /></A>);

      expect(arr).toStrictEqual([ 6, 10 ]);
    });
  });
  describe('when we have concurrent activities happening and a chance for collisions', () => {
    it.only('should not produce bugs related to overwriting `result` or `scope` properties of the element', async () => {
      const Wrapper = async function ({ children }) {
        await children({ value: 10 });
        await children({ value: 20 });
      }
      const B = jest.fn();
      const Z = async function ({ answer }) {
        return <B answer={ answer.value } />;
      }

      await run(
        <A>
          <Wrapper exports='answer'>
            (<Z $answer/>)
          </Wrapper>
        </A>
      );

      expect(B).toBeCalledTimes(2);
      expect(B).toBeCalledWith(expect.objectContaining({ answer: 10 }));
      expect(B).toBeCalledWith(expect.objectContaining({ answer: 20 }));
    });
  });
});