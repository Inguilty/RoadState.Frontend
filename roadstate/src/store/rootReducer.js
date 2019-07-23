import { combineReducers } from 'redux';
import bugReport from '../components/pages/bugreport/reducers';
import createBugReport from '../components/createBugReport/reducers';
import registration from '../components/pages/registration/registrationReducer';
import authorization from '../components/pages/authorization/authorizationReducer';
import updateUser from '../components/pages/profile/updateUserReducer';

const rootReducer = combineReducers({
  bugReport,
  createBugReport,
  registration,
  authorization,
  updateUser,
});

export default rootReducer;
