import { combineReducers } from 'redux';
import bugReport from '../components/pages/bugreport/reducers';
import user from '../components/pages/user/reducers';

const rootReducer = combineReducers({
  bugReport,
  user,
});

export default rootReducer;
