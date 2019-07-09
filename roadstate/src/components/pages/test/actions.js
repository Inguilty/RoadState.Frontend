export const SEND_MESSAGE = 'messages/SEND_MESSAGE';

export const sendMessage = message => ({
  type: SEND_MESSAGE,
  message
});
