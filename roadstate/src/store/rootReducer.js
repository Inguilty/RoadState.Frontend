import { combineReducers } from 'redux';
import { registration } from './reducers/registration';
import { authentication } from './reducers/authentication';
import { updateUser } from './reducers/updateUser';
import bugReport from '../components/pages/bugreport/reducers';
import user from '../components/pages/user/reducers';
import messages from '../components/pages/test/reducers';

const rootReducer = combineReducers({
  messages,
  registration,
  authentication,
  updateUser,
  bugReport,
  user
});

export default rootReducer;
