import { combineReducers } from "redux";
import messages from "./testReducer";

const rootReducer = combineReducers({
  messages
});

export default rootReducer;
