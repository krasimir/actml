/** @jsx A */
import { createStore, applyMiddleware } from 'redux';
import { A, run, Redux } from '../../../';

const {
  middleware,
  Subscribe,
  SubscribeOnce,
  Inspect,
  Action,
  Select,
  reset
} = Redux;

const nextTick = (delay = 1) => new Promise(done => setTimeout(done, delay));
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
      const Z = jest.fn();
      
      await run(
        <Subscribe type='ANSWER'>
          {
            ({ value }) => <Z value={ value } />
          }
        </Subscribe>
      );

      store.dispatch({ type: 'ANSWER', value: 100 });
      store.dispatch({ type: 'ANOTHER_ANSWER' });
      store.dispatch({ type: 'ANSWER', value: 200 });

      await nextTick();

      expect(Z).toHaveBeenCalledTimes(2);
      expect(Z).toBeCalledWith({ value: 200 });
      expect(Z).toBeCalledWith({ value: 100 });
    });
    it('should be able to register the action in the context', async () => {
      const ANSWER = 'ANSWER';
      const store = setup(
        { answer: null },
        (state, action) => (action.type === 'ANSWER' ? { answer: action.value } : state)
      );
      const Z = jest.fn();
      
      await run(
        <Subscribe type={ ANSWER } exports='action'>
          <Z $action />
        </Subscribe>
      );

      store.dispatch({ type: ANSWER, value: 100 });
      await nextTick();
      store.dispatch({ type: ANSWER, value: 200 });
      await nextTick();

      expect(Z).toHaveBeenCalledTimes(2);
      expect(Z).toHaveBeenNthCalledWith(1, { action: { type: ANSWER, value: 100 } });
      expect(Z).toHaveBeenNthCalledWith(2, { action: { type: ANSWER, value: 200 } });
    });
  });
  describe('when using the SubscribeOnce word', () => {
    it('should subscribe to a Redux action only once', async () => { 
      const store = setup(
        { answer: null },
        (state, action) => (action.type === 'ANSWER' ? { answer: action.value } : state)
      );
      const Z = jest.fn();
      const B = jest.fn();
      const C = jest.fn();
      
      await run(
        <A>
          <SubscribeOnce type='FOO' />
          <SubscribeOnce type='ZAR' exports='action'>
            <C $action />
          </SubscribeOnce>
          <SubscribeOnce type='ANSWER'>
            {
              ({ value }) => (
                <A>
                  <Z value={ value } />
                  <Inspect>{ ({ numOfSubscribes }) => <B numOfSubscribes={ numOfSubscribes } /> }</Inspect>
                </A>
              )
            }
          </SubscribeOnce>
          <SubscribeOnce type='BAR' />
        </A>
      );

      store.dispatch({ type: 'ANSWER', value: 100 });
      store.dispatch({ type: 'ANOTHER_ANSWER' });
      store.dispatch({ type: 'ANSWER', value: 200 });
      store.dispatch({ type: 'ZAR', foo: 'bar' });

      await nextTick();

      expect(Z).toHaveBeenCalledTimes(1);
      expect(Z).toBeCalledWith({ value: 100 });
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
      const Z = () => 2;
      
      await run(
        <A>
          <Z exports='amount' />
          <Action type='INCREASE' $amount='n'/>
          <Action type='INCREASE' $amount='n'/>
          <Action type='INCREASE' n={10}/>
        </A>
      );

      expect(store.getState().counter).toBe(14);
    });
  });
  describe('when using the Select word', () => {
    it('should get the data from the store', async () => {
      const store = setup(
        { user: { age: 40 } }
      );
      const Z = jest.fn();
      const selector = function (state) {
        return state.user.age;
      }
      
      await run(
        <A>
          <Select selector={ selector } exports='age' />
          <Z $age />
        </A>
      );

      expect(Z).toBeCalledWith({ age: 40 });
    });
    describe('and we have parameterized selector', () => {
      it('should get the data from the store', async () => {
        const store = setup(
          { user: { age: 40 } }
        );
        const Z = () => 50;
        const B = jest.fn();
        const IsItOver = ({ over }) => ({ user }) => {
          return user.age > over;
        }
        
        await run(
          <A>
            <Z exports='over'/>
            <Select selector={ <IsItOver $over /> } exports='answer' />
            <B $answer />
          </A>
        );
  
        expect(B).toBeCalledWith({ answer: false });
      });
    });
  });
});