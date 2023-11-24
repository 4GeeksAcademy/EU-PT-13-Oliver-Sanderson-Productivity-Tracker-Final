import React from "react";
import { Navigate } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-black">
      <div className="container-fluid">
        <strong><a className="navbar-brand text-white" href="#">KorYoku</a></strong>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link text-white" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/dashboard">Dashboard</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/ContactUs">Contact Us</a>
            </li>
          </ul>
        </div>
        <div className="d-flex">
          <a className="btn btn setbtn" href="login">Sign in</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
