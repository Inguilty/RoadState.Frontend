import { combineReducers } from 'redux';
import registration from '../components/pages/registration/registrationReducer';
import authorization from '../components/pages/authorization/authorizationReducer';
import updateUser from '../components/pages/profile/updateUserReducer';
import bugReport from '../components/pages/bugreport/reducers';

const root = combineReducers({
  registration,
  authorization,
  updateUser,
  bugReport,
});

export default root;
