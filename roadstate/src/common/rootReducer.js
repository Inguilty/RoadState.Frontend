import { combineReducers } from "redux";
import messages from "../test/sendReducer";

const rootReducer = combineReducers({
  messages
});

export default rootReducer;
