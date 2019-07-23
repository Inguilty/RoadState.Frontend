import { combineReducers } from 'redux';
import bugReport from '../components/pages/bugreport/reducers';

const rootReducer = combineReducers({
  bugReport,
});

export default rootReducer;
