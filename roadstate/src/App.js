import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/layout/Header';
import HomePage from './components/pages/home';
import AboutPage from './components/pages/about';
import PageNotFound from './components/pages/pagenotfound';
import WithBugReport from './components/pages/bugreport/WithBugReport';
import SignIn from './components/pages/authorization/SignIn';
import SignUp from './components/pages/registration/SignUp';
import ShowProfile from './components/pages/profile/ShowProfile';
import PrivateRoute from './components/routes/PrivateRoute';

import ViewMap from './components/viewmap/ViewMap';

const App = () => (
  <div className="container-fluid">
    <Header />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/signIn" component={SignIn} />
      <Route path="/signUp" component={SignUp} />
      <PrivateRoute path="/profile" component={ShowProfile} />
      <Route path="/view" component={WithBugReport} />
      <Route component={PageNotFound} />
    </Switch>
    <ViewMap />
  </div>
);

export default App;
