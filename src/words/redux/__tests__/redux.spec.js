/** @jsx D */
import { createStore, applyMiddleware } from 'redux';
import { D, speak, Redux } from '../../../';

const {
  middleware,
  Subscribe,
  SubscribeOnce,
  Inspect,
  Action,
  Select,
  reset
} = Redux;

const nextTick = () => new Promise(done => setTimeout(done, 1));
const setup = (initialState = {}, reducer = s => s) => {
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
    it('should be able to register the action in the context', async () => {
      const ANSWER = 'ANSWER';
      const store = setup(
        { answer: null },
        (state, action) => (action.type === 'ANSWER' ? { answer: action.value } : state)
      );
      const A = jest.fn();
      
      await speak(
        <Subscribe type={ ANSWER } exports='action'>
          <A $action />
        </Subscribe>
      );

      store.dispatch({ type: ANSWER, value: 100 });

      await nextTick();

      expect(A).toBeCalledWith({ action: { type: ANSWER, value: 100 } });
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
      const C = jest.fn();
      
      await speak(
        <D>
          <SubscribeOnce type='FOO' />
          <SubscribeOnce type='ZAR' exports='action'>
            <C $action />
          </SubscribeOnce>
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
      store.dispatch({ type: 'ZAR', foo: 'bar' });

      await nextTick();

      expect(A).toHaveBeenCalledTimes(1);
      expect(A).toBeCalledWith({ value: 100 });
      expect(B).toBeCalledWith({ numOfSubscribes: 2 });
      expect(C).toBeCalledWith({ action: { type: 'ZAR', foo: 'bar' } });
    });
  });
  describe('when using the Action word', () => {
    it('should dispatch an action', async () => {
      const store = setup(
        { counter: 0 },
        (state, action) => (action.type === 'INCREASE' ? { counter: state.counter + action.n } : state)
      );
      const A = () => 2;
      
      await speak(
        <D>
          <A exports='amount' />
          <Action type='INCREASE' $amount='n'/>
          <Action type='INCREASE' $amount='n'/>
          <Action type='INCREASE' n={10}/>
        </D>
      );

      expect(store.getState().counter).toBe(14);
    });
  });
  describe('when using the Select word', () => {
    it('should get the data from the store', async () => {
      const store = setup(
        { user: { age: 40 } }
      );
      const A = jest.fn();
      const selector = function (state) {
        return state.user.age;
      }
      
      await speak(
        <D>
          <Select selector={ selector } exports='age' />
          <A $age />
        </D>
      );

      expect(A).toBeCalledWith({ age: 40 });
    });
    describe('and we have parameterized selector', () => {
      it('should get the data from the store', async () => {
        const store = setup(
          { user: { age: 40 } }
        );
        const A = () => 50;
        const B = jest.fn();
        const IsItOver = ({ over }) => ({ user }) => {
          return user.age > over;
        }
        
        await speak(
          <D>
            <A exports='over'/>
            <Select selector={ <IsItOver $over /> } exports='answer' />
            <B $answer />
          </D>
        );
  
        expect(B).toBeCalledWith({ answer: false });
      });
    });
  });
});