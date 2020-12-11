import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <NavLink to='/' exact className='link' activeClassName='activeLink'>
        Home
      </NavLink>
      <NavLink
        to='/about'
        className='link'
        activeClassName='activeLink'
        style={{ marginLeft: "10px" }}>
        About
      </NavLink>
    </>
  );
};

export default Navigation;
