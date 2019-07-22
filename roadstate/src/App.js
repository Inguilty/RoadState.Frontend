import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Header from './components/layout/Header';
import HomePage from './components/pages/home';
import AboutPage from './components/pages/about';
import PageNotFound from './components/pages/pagenotfound';
import SignIn from './components/pages/authorization/SignIn';
import SignUp from './components/pages/registration/SignUp';
import ShowProfile from './components/pages/profile/ShowProfile';
import PrivateRoute from './components/routes/PrivateRoute';

class App extends React.Component {
  render() {
    const { loggedIn } = this.props;
    return (
      <div className="container-fluid">
        <Header />
        <div className="jumbotron">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/signIn" component={SignIn} />
            <Route path="/signUp" component={SignUp} />
            <PrivateRoute path="/profile" authed={loggedIn} component={ShowProfile} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

PrivateRoute.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  loggedIn: state.authorization.loggedIn,
});

export default connect(mapStateToProps)(App);
