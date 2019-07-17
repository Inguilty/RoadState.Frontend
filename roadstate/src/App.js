import React from 'react';
import Header from './components/layout/Header';
import { Route, Switch } from 'react-router-dom';
import HomePage from './components/pages/home';
import AboutPage from './components/pages/about';
import PageNotFound from './components/pages/pagenotfound';
import TestForm from './components/pages/test';
import SignIn from './components/pages/authorization/SignIn';
import SignUp from './components/pages/authorization/SignUp';
import LogOut from './components/pages/authorization/LogOut';
import ShowProfile from './components/pages/authorization/ShowProfile';
import PrivateRoute from './components/PrivateRoute';

class App extends React.Component {
  render() {
    return (
      <div class='container-fluid'>
        <Header />
        <div className='jumbotron'>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/about' component={AboutPage} />
            <Route path='/test' component={TestForm} />
            <Route path='/signIn' component={SignIn} />
            <Route path='/signUp' component={SignUp} />
            <PrivateRoute path='/logOut' component={LogOut} />
            <PrivateRoute path='/profile' component={ShowProfile} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;
