import { combineReducers } from 'redux';
import { users } from './reducers/usersReducer';
import { registration } from './reducers/registrationReducer';
import { authentication } from './reducers/authenticationReducer';
import { alert } from './reducers/alertReducer';
import messages from '../components/pages/test/reducers';

const rootReducer = combineReducers({
  messages,
  users,
  registration,
  authentication,
  alert
});

export default rootReducer;
