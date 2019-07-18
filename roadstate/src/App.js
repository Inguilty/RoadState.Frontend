import React from 'react';
import Header from './components/layout/Header';
import { Route, Switch } from 'react-router-dom';
import HomePage from './components/pages/home';
import AboutPage from './components/pages/about';
import PageNotFound from './components/pages/pagenotfound';
import SignIn from './components/pages/authorization/SignIn';
import SignUp from './components/pages/authorization/SignUp';
import ShowProfile from './components/pages/authorization/ShowProfile';
import PrivateRoute from './components/routes/PrivateRoute';
import UnauthorizedRoute from './components/routes/UnauthorizedRoute';

class App extends React.Component {
  render() {
    return (
      <div class='container-fluid'>
        <Header />
        <div className='jumbotron'>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/about' component={AboutPage} />
            <UnauthorizedRoute path='/signIn' component={SignIn} />
            <UnauthorizedRoute path='/signUp' component={SignUp} />
            <PrivateRoute path='/profile' component={ShowProfile} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;
