export const SEND_MESSAGE = "SEND_MESSAGE";

export function SendMessage(message) {
  return { type: SEND_MESSAGE, message };
}
