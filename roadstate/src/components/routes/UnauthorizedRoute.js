import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const UnauthorizedRoute = ({ component: Component }) => (
  <Route
    render={props => (props.user ? (
      <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    ) : (
      <Component {...props} />
    ))
    }
  />
);

UnauthorizedRoute.propTypes = {
  component: PropTypes.objectOf.isRequired,
  location: PropTypes.objectOf.isRequired,
  user: PropTypes.objectOf.isRequired,
};

const mapStateToProps = state => ({
  user: state.authorizationReducer.user,
});

export default connect(mapStateToProps)(UnauthorizedRoute);
