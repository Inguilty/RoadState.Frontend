import { combineReducers } from 'redux';
import messages from '../components/pages/test/reducers';
import bugReport from '../components/pages/viewbugreport/reducers';

const rootReducer = combineReducers({
  messages,
  bugReport
});

export default rootReducer;
