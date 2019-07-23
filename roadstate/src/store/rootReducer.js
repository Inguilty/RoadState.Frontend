import { combineReducers } from 'redux';
import registration from '../components/pages/registration/reducer';
import authorization from '../components/pages/authorization/reducer';
import updateUser from '../components/pages/profile/reducer';
import bugReport from '../components/pages/bugreport/reducers';

const root = combineReducers({
  registration,
  authorization,
  updateUser,
  bugReport,
});

export default root;
