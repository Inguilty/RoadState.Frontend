import { combineReducers } from 'redux';
import { registration } from '../components/pages/authorization/reducers/registration';
import { authentication } from '../components/pages/authorization/reducers/authentication';
import { updateUser } from '../components/pages/authorization/reducers/updateUser';
import bugReport from '../components/pages/bugreport/reducers';
import user from '../components/pages/user/reducers';

const rootReducer = combineReducers({
  registration,
  authentication,
  updateUser,
  bugReport,
  user,
});

export default rootReducer;
