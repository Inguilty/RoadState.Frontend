import { combineReducers } from 'redux';
import messages from '../components/pages/test/reducers';

const rootReducer = combineReducers({
  messages,
});

export default rootReducer;
