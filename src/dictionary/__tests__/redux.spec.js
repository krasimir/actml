/** @jsx D */
import { createStore, applyMiddleware } from 'redux';
import { middleware, Subscribe } from '../redux';
import { D, speak } from '../../';

const nextTick = () => new Promise(done => setTimeout(done, 1));

describe('Given the Redux integration', () => {
  describe('when using the Subscribe word', () => {
    it('should subscribe to a Redux action', async () => {
      const initialState = { answer: null };
      const reducer = (state, action) => {
        if (action.type === 'ANSWER') {
          return { answer: action.value };
        }
        return state;
      }
      const store = createStore(reducer, initialState, applyMiddleware(middleware));
      const A = jest.fn();
      
      await speak(
        <Subscribe type='ANSWER'>
          {
            ({ value }) => {
              return <A value={ value } />
            }
          }
        </Subscribe>
      );

      store.dispatch({ type: 'ANSWER', value: 100 });
      store.dispatch({ type: 'ANOTHER_ANSWER' });
      store.dispatch({ type: 'ANSWER', value: 200 });

      await nextTick();

      expect(A).toHaveBeenCalledTimes(2);
      expect(A).toBeCalledWith({ value: 200 });
      expect(A).toBeCalledWith({ value: 100 });
    });
  });
});