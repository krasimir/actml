/** @jsx A */
import { A, run } from '..';

describe('Given the ActML library', () => {
  describe('when we have a FACC that returns raw data', () => {
    it('should present the data at the exit', async () => {
      async function GetData({ children }) {
        return children({ data: [{ n: 2 }, { n: 4 }] });
      }
      function Get() {
        return (
          <GetData exports='arr'>
            {
              ({ data }) => {
                return data.map(({ n }) => n + 1);
              }
            }
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
        return children({ data: [{ n: 2 }, { n: 4 }] });
      }
      function TransformData({ data }) {
        return data.map(({ n }) => n + 1);
      }
      function Get() {
        return (
          <GetData exports='arr'>
            {
              function * ({ data }) {
                const result = yield <TransformData data={ data } />;

                return result.map(a => a * 2);
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
    it('should not produce bugs related to overwriting `result` or `scope` properties of the element', async () => {
      const Wrapper = async function ({ children }) {
        await children({ answer: 10 });
        await children({ answer: 20 });
        return 100;
      };
      const B = jest.fn().mockImplementation(({ answer }) => answer);
      const Z = async function ({ answer }) {
        return <B answer={ answer } />;
      };

      const res = await run(
        <A>
          <Wrapper>
            (<Z $answer exports='finalAnswer'/>)
          </Wrapper>
        </A>
      );

      expect(B).toBeCalledTimes(2);
      expect(B).toBeCalledWith(expect.objectContaining({ answer: 10 }));
      expect(B).toBeCalledWith(expect.objectContaining({ answer: 20 }));
      expect(res).toEqual(expect.objectContaining({ finalAnswer: 20 }));
    });
  });
});
