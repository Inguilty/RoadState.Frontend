import { combineReducers } from 'redux';
import bugReportReducer from '../components/pages/bugreport/reducers';
import userReducer from '../components/pages/user/reducers';

const rootReducer = combineReducers({
  bugReportReducer,
  userReducer,
});

export default rootReducer;
