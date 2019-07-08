import { createMessage } from "./testActions";

describe("actions", () => {
  it("should create a CREATE_TEST action", () => {
    const message = { text: "Test redux action" };
    const expectedAction = {
      type: "CREATE_TEST",
      message
    };

    const action = createMessage(message);
    expect(action).toEqual(expectedAction);
  });
});
