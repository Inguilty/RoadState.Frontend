import { combineReducers } from 'redux';
import bugReportReducer from '../components/pages/bugreport/reducers';
import user from '../components/pages/user/reducers';

const rootReducer = combineReducers({
  bugReportReducer,
  user,
});

export default rootReducer;
