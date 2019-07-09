import { SendMessage } from "./actions";
import sendReducer from "./reducers";
import deepFreeze from "deep-freeze";

it("shoud add a message when passed throughe action with type SEND_MESSAGE", () => {
  const initialState = [];
  deepFreeze(initialState);

  const newMessage = { text: "My first message!" };
  const sendAction = SendMessage(newMessage);
  const newState = sendReducer(initialState, sendAction);

  expect(newState.length).toEqual(1);
  expect(newState[0].text).toEqual("My first message!");
});
