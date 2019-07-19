import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/layout/Header';
import HomePage from './components/pages/home';
import AboutPage from './components/pages/about';
import PageNotFound from './components/pages/pagenotfound';
import BugReport from './components/pages/bugreport/BugReport';
import SignIn from './components/pages/authorization/SignIn';
import SignUp from './components/pages/authorization/SignUp';
import LogOut from './components/pages/authorization/LogOut';
import ShowProfile from './components/pages/authorization/ShowProfile';
import ViewMap from './components/viewmap/ViewMap';
import CreateBugReport from './components/createBugReport';

const App = () => (
  <div className="container-fluid">
    <Header />
    <div className="jumbotron">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/signIn" component={SignIn} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/logOut" component={LogOut} />
        <Route path="/profile" component={ShowProfile} />
        <Route path="/view" component={BugReport} />
        <Route component={PageNotFound} />
      </Switch>
      <CreateBugReport />
    </div>
    <ViewMap />
  </div>
);

export default App;
