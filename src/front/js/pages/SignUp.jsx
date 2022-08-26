import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Signup = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("")
	const [pass, setPass] = useState("")

  return (
    <>
      <div className="container w-50 mx-auto  vh-100 d-flex flex-column">
        <h1 className="mt-5">Create an account!</h1>
        <label className="mt-5" htmlFor="email_input">
          Email:
        </label>
        <input
          type="text"
          placeholder="user@email.com"
          onChange={(e) => setEmail(e.target.value)}
          id="email_input"
        />
        <br />
        <label htmlFor="password_input">Password:</label>
        <input
          type="password"
          placeholder=""
          onChange={(e) => setPass(e.target.value)}
          id="password_input"
        />
        <br />
        <button className="btn btn-outline-dark" onClick={() => {
          if(email == "" || pass == "")
          {alert("Error in email or password")} else {
            actions.signup(email, pass)
          }}}>
          Submit
        </button>
      </div>
    </>
  )
};

