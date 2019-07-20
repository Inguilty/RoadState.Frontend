import { combineReducers } from 'redux';
import { registrationReducer } from '../components/pages/authorization/registrationReducer';
import { authorizationReducer } from '../components/pages/authorization/authorizationReducer';
import { updateUserReducer } from '../components/pages/authorization/updateUserReducer';
import { logOutReducer } from '../components/pages/authorization/logOutReducer';
import bugReport from '../components/pages/bugreport/reducers';
import user from '../components/pages/user/reducers';

const rootReducer = combineReducers({
  registrationReducer,
  authorizationReducer,
  logOutReducer,
  updateUserReducer,
  bugReport,
  user,
});

export default rootReducer;
