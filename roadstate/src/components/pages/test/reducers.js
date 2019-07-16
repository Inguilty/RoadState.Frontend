import { SEND_MESSAGE } from './actions';

function sendReducer(state = [], action) {
  switch (action.type) {
    case SEND_MESSAGE:
      return [...state, { ...action.message }];
    default:
      return state;
  }
}
export default sendReducer;
