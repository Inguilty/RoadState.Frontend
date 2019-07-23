import { combineReducers } from 'redux';
<<<<<<< HEAD
import bugReportReducer from '../components/pages/bugreport/reducers';
import userReducer from '../components/pages/user/reducers';

const rootReducer = combineReducers({
  bugReportReducer,
  userReducer,
=======
import bugReport from '../components/pages/bugreport/reducers';

const rootReducer = combineReducers({
  bugReport,
>>>>>>> 99cfb0f2e77954162247192dc8c183abc4779127
});

export default rootReducer;
