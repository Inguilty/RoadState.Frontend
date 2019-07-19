import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/layout/Header';
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
      <div className="container-fluid">
        <Header />
        <div className="jumbotron">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/signIn" component={SignIn} />
            <Route path="/signUp" component={SignUp} />
            <Route path="/profile" component={ShowProfile} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;
