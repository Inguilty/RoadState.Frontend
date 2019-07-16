import { combineReducers } from "redux";
import messages from "../components/pages/test/reducers";
import bugReport from "../components/pages/bugreport/reducers";
import user from "../components/pages/user/reducers";

const rootReducer = combineReducers({
  messages,
  bugReport,
  user,
});

export default rootReducer;
