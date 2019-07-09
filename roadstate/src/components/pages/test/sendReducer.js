import { SEND_MESSAGE } from "../../../actionTypes/ActionTypes";

export default function sendReducer(state = [], action) {
  switch (action.type) {
    case SEND_MESSAGE:
      return [...state, { ...action.message }];
    default:
      return state;
  }
}
