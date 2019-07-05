import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const active = { color: "#F15B2A" };

  return (
    <nav>
      <NavLink to="/" activeStyle={active} exact>
        Home
      </NavLink>
      {"|"}
      <NavLink to="/about" activeStyle={active}>
        About
      </NavLink>
    </nav>
  );
};

export default Header;
