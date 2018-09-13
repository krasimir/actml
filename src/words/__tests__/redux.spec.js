/** @jsx D */
import { createStore, applyMiddleware } from 'redux';
import { D, speak, redux } from '../../';

const {
  middleware,
  Subscribe,
  SubscribeOnce,
  Inspect,
  reset
} = redux;

const nextTick = () => new Promise(done => setTimeout(done, 1));
const setup = (initialState, reducer) => {
  return createStore(reducer, initialState, applyMiddleware(middleware));
}

describe('Given the Redux integration', () => {
  beforeEach(() => {
    reset();
  });
  describe('when using the Subscribe word', () => {
    it('should subscribe to a Redux action', async () => { 
      const store = setup(
        { answer: null },
        (state, action) => (action.type === 'ANSWER' ? { answer: action.value } : state)
      );
      const A = jest.fn();
      
      await speak(
        <Subscribe type='ANSWER'>
          {
            ({ value }) => <A value={ value } />
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
  describe('when using the SubscribeOnce word', () => {
    it('should subscribe to a Redux action only once', async () => { 
      const store = setup(
        { answer: null },
        (state, action) => (action.type === 'ANSWER' ? { answer: action.value } : state)
      );
      const A = jest.fn();
      const B = jest.fn();
      
      await speak(
        <D>
          <SubscribeOnce type='FOO' />
          <SubscribeOnce type='ZAR' />
          <SubscribeOnce type='ANSWER'>
            {
              ({ value }) => (
                <D>
                  <A value={ value } />
                  <Inspect>{ ({ numOfSubscribes }) => <B numOfSubscribes={ numOfSubscribes } /> }</Inspect>
                </D>
              )
            }
          </SubscribeOnce>
          <SubscribeOnce type='BAR' />
        </D>
      );

      store.dispatch({ type: 'ANSWER', value: 100 });
      store.dispatch({ type: 'ANOTHER_ANSWER' });
      store.dispatch({ type: 'ANSWER', value: 200 });

      await nextTick();

      expect(A).toHaveBeenCalledTimes(1);
      expect(A).toBeCalledWith({ value: 100 });
      expect(B).toBeCalledWith({ numOfSubscribes: 3 });
    });
  });
});