import { combineReducers } from 'redux';
import bugReport from '../components/pages/bugreport/reducers';
import createBugReport from '../components/createBugReport/reducers';

const rootReducer = combineReducers({
  bugReport,
  createBugReport,
});

export default rootReducer;
