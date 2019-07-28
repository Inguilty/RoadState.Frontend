import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import * as userActions from '../pages/authorization/actions';

class Header extends React.Component {
  handleLogout = () => {
    const { logOut, userLoggedIn } = this.props;
    if (userLoggedIn) {
      logOut();
    }
  };

  render() {
    const { userLoggedIn } = this.props;
    return (
      <nav className="navbar navbar-expand-xl navbar-dark bg-dark" style={{ height: '9vh' }}>
        <NavLink className="navbar-brand" to="/" exact>
          RoadState
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {userLoggedIn ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" onClick={this.handleLogout}>
                    Log out
                  </NavLink>
                </li>
              </>
            ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signIn">
                      Sign in
                  </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signUp">
                      Sign up
                  </NavLink>
                  </li>
                </>
              )}
          </ul>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  userLoggedIn: PropTypes.objectOf.isRequired,
  logOut: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userLoggedIn: state.authorization.loggedIn,
});

export default connect(
  mapStateToProps,
  { logOut: userActions.logout },
)(Header);
