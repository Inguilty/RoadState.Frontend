import { SEND_MESSAGE } from "./actions";

export default function sendReducer(state = [], action) {
  switch (action.type) {
    case SEND_MESSAGE:
      return [...state, { ...action.message }];
    default:
      return state;
  }
}
