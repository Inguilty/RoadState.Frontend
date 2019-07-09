import { combineReducers } from "redux";
import messages from "../components/pages/test/sendReducer";

const rootReducer = combineReducers({
  messages
});

export default rootReducer;
