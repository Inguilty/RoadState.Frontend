import { combineReducers } from 'redux';
import registration from '../components/pages/registration/reducer';
import authorization from '../components/pages/authorization/reducer';
import updateUser from '../components/pages/profile/reducer';
import bugReport from '../components/pages/bugreport/reducers';
import createBugReport from '../components/createBugReport/reducers';
//import bugReportRectangle from '../components/viewmap/reducer';
import bugReportRectangle from '../components/route/reducer';

const root = combineReducers({
  registration,
  authorization,
  updateUser,
  bugReport,
  createBugReport,
  bugReportRectangle,
});

export default root;
