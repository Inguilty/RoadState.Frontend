import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (props.loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/signIn', state: { from: props.location } }} />
    ))
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.objectOf.isRequired,
  location: PropTypes.objectOf.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  loggedIn: state.authorization.loggedIn,
});

export default connect(mapStateToProps)(PrivateRoute);
