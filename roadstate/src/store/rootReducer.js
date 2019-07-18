import { combineReducers } from 'redux';
import { registration } from './reducers/registrationReducer';
import { authentication } from './reducers/authenticationReducer';
import messages from '../components/pages/test/reducers';

const rootReducer = combineReducers({
  messages,
  registration,
  authentication
});

export default rootReducer;
