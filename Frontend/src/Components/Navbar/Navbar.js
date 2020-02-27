import React from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
// import "./Navbar.css";

const Navbar = props => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
      <div className="d-flex">
        <ul class="navbar-nav d-flex">
          <li class="nav-item active">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li class="nav-item">
            <NavLink to="/productadmin" className="nav-link">Admin</NavLink>
          </li>
          <li class="nav-item">
            <NavLink to="/productcreate" className="nav-link">Opret Produkt</NavLink>
          </li>
          <li class="nav-item">
            <NavLink to="/weather" className="nav-link">Tjek vejret</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
