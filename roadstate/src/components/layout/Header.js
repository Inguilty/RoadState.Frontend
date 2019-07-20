import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { userActions } from '../pages/authorization/userActions';

class Header extends React.Component {
  handleLogout = () => {
    const { logOut } = this.props;
    logOut();
  };

  render() {
    // debugger;
    const { userLoggedIn } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
            <li className="nav-item active">
              <NavLink className="nav-link" to="/" exact>
                Home
                {' '}
                <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/test">
                Test react-redux component
              </NavLink>
            </li>

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
  userLoggedIn: state.authorizationReducer.user,
});

const mapDispatchToProps = {
  logOut: userActions.logout(),
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
