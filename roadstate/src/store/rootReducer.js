import { combineReducers } from 'redux';
import { registration } from './reducers/registration';
import { authentication } from './reducers/authentication';
import { updateUser } from './reducers/updateUser';
import messages from '../components/pages/test/reducers';

const rootReducer = combineReducers({
  messages,
  registration,
  authentication,
  updateUser
});

export default rootReducer;
