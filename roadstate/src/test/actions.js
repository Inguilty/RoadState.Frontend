import { SEND_MESSAGE } from "../common/ActionTypes";

export function SendMessage(message) {
  return { type: SEND_MESSAGE, message };
}
