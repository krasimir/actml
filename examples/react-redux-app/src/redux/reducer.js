import { USERS_FETCHED } from './constants';

const initialState = {

}

const reducer = function (oldState = initialState, action) {
  if (action.type === USERS_FETCHED) {
    return { users: action.response.data };
  }
  return oldState;
};

export default reducer;