import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  const removeTokenHandler = () => {
    actions.logout();
    actions.getToken();
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container d-flex justify-content-end">
        <Link to="/" className="me-auto">
          <span className="navbar-brand me-auto h1">Home</span>
        </Link>
        <Link to="/login">
          {store.token ? (
            <></>
          ) : (
            <button className="btn btn-outline-dark m-1">Login!</button>
          )}
        </Link>
        <Link to="/">
          {store.token ? (
            <button
              className="btn btn-outline-dark m-1"
              onClick={removeTokenHandler}
            >
              Log out
            </button>
          ) : (
            <></>
          )}
        </Link>
        <Link to="/signup">
          {store.token ? (
            <></>
          ) : (
            <button className="btn btn-outline-dark m-1">Sign up!</button>
          )}
        </Link>
        {/* if user in show logout button */}
      </div>
    </nav>
  );
};
