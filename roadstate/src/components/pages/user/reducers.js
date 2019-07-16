import { LOAD_USER_SUCCESSFULLY } from './actions';

const loadUserReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_USER_SUCCESSFULLY:
      return action.user;
    default:
      return state;
  }
};

export default loadUserReducer;
