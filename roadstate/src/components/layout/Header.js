import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => (
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
            Home <span className="sr-only">(current)</span>
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
        <li className="nav-item">
          <NavLink className="nav-link" to="view">
            View bug report
          </NavLink>
        </li>
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
        <li className="nav-item">
          <NavLink className="nav-link" to="/profile">
            Profile
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/logOut">
            Log out
          </NavLink>
        </li>
      </ul>
    </div>
  </nav>
);

export default Header;
