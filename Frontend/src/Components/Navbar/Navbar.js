import React from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
// import "./Navbar.css";

const Navbar = props => {
  return (
    <nav>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <NavLink to="/productadmin">Admin</NavLink>
          </li>
          <li>
            <NavLink to="/productcreate">Opret Produkt</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
