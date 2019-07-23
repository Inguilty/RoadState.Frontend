import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends React.Component {
  render() {
    const { component: Component, loggedIn } = this.props;
    return (
      <Route
        render={props => (loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/signIn', state: { from: props.location } }} />
        ))
        }
      />
    );
  }
}

PrivateRoute.propTypes = {};

PrivateRoute.propTypes = {
  component: PropTypes.objectOf.isRequired,
  location: PropTypes.objectOf.isRequired,
  authorized: PropTypes.objectOf.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  loggedIn: state.authorization.loggedIn,
});

export default connect(mapStateToProps)(PrivateRoute);
