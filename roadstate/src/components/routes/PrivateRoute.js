import React from 'react';
import { PropTypes } from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, authorized, ...rest }) => (
  <Route
    {...rest}
    render={props => (authorized ? (
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
  authorized: PropTypes.objectOf.isRequired,
};

export default PrivateRoute;
