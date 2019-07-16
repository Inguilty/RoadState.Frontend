import { sendMessage, SEND_MESSAGE } from './actions';

describe('TestFormActions', () => {
  it('should create a SEND_MESSAGE action', () => {
    const message = { text: 'Redux working!' };
    const expectedAction = {
      type: SEND_MESSAGE,
      message,
    };
    expect(sendMessage(message)).toEqual(expectedAction);
  });
});
