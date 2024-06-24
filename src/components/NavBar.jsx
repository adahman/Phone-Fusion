import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ isLoggedIn, onLogout }) => {
  return (
    <nav>
      <ul className="nav-links">
        <li>
          <Link to="/phones">Phones</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
        {!isLoggedIn && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
      {isLoggedIn && (
        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      )}
    </nav>
  );
};

export default NavBar;
