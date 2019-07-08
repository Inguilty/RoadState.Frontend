import { SEND_MESSAGE } from "../common/ActionTypes";
import { SendMessage } from "./actions";

describe("TestFormActions", () => {
  it("should create a SEND_MESSAGE action", () => {
    const message = { text: "Redux working!" };
    const expectedAction = {
      type: SEND_MESSAGE,
      message
    };
    expect(SendMessage(message)).toEqual(expectedAction);
  });
});
