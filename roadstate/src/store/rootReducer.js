import { combineReducers } from 'redux';
import registration from '../components/pages/authorization/registrationReducer';
import authorization from '../components/pages/authorization/authorizationReducer';
import updateUser from '../components/pages/authorization/updateUserReducer';
import bugReport from '../components/pages/bugreport/reducers';
import user from '../components/pages/user/reducers';

const root = combineReducers({
  registration,
  authorization,
  updateUser,
  bugReport,
  user,
});

export default root;
