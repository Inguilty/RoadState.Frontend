import { SEND_MESSAGE } from "../../../actionTypes/ActionTypes";

export function SendMessage(message) {
  return { type: SEND_MESSAGE, message };
}
