export const LOAD_BUG_REPORT_SUCCESS = 'bugreports/LOAD_BUG_REPORT_SUCCESS';
export const SEND_MESSAGE = 'messages/SEND_MESSAGE';

export const sendMessage = message => ({
  type: SEND_MESSAGE,
  message,
});
