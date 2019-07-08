export default function testReducer(state = [], action) {
  switch (action.type) {
    case "CREATE_TEST":
      return [...state, { ...action.message }];
    default:
      return state;
  }
}
