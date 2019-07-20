import { combineReducers } from 'redux';
import bugReport from '../components/pages/bugreport/reducers';
import user from '../components/pages/user/reducers';
import createBugReport from '../components/createBugReport/reducers';

const rootReducer = combineReducers({
  bugReport,
  user,
  createBugReport,
});

export default rootReducer;
