import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./bank.png";
import "./styles/navbar.css";

export default function App() {
  const [ref, setRef] = useState(false);
  let user = localStorage.getItem("bankUser") || "null";

  const logout = () => {
    localStorage.setItem("bankUser", (null));
    setRef(!ref);
  }

  return (
    <nav id="navh" className="navbar navbar-expand-lg navbar-light ">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img className="nav-logo" src={logo} width="75px" height="75px" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon span"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item js-scroll-trigger">
              <Link to="/">Home</Link>
            </li>
            {user === "null" && (
              <>
                <li className="nav-item js-scroll-trigger">
                  <Link to="/create">Create Account</Link>
                </li>
                <li className="nav-item js-scroll-trigger">
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
            {user !== "null" && (
              <>
                <li className="nav-item js-scroll-trigger">
                  <Link to="/deposit">Deposit</Link>
                </li>
                <li className="nav-item js-scroll-trigger">
                  <Link to="/withdraw">withdraw</Link>
                </li>
                <li className="nav-item js-scroll-trigger">
                  <Link to="/account">Account Details</Link>
                </li>
                <li className="nav-item js-scroll-trigger">
                  <Link to="/" onClick={logout}>
                    Logout
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
