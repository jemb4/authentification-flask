import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate() ;
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")

  const token = localStorage.getItem("token");

  return (
    <>{store.auth == true ? navigate("/private") : <div className="container w-50 mx-auto  vh-100 d-flex flex-column">
    <h1 className="mt-5">Login</h1>
    <label className="mt-5" htmlFor="email_input">
      Email:
    </label>
    <input
      type="text"
      placeholder="user@email.com"
      id="email_input"
      onChange={(e)=> setEmail(e.target.value)}
    />
    <br />
    <label htmlFor="password_input">Password:</label>
    <input
      type="password"
      placeholder=""
      id="password_input"
      onChange={(e) => setPass(e.target.value)}
    />
    <br />
    <button className="btn btn-outline-dark" onClick={() => {if(email =="" || pass == ""){
        alert("Error in email or password")
    } else {
        actions.login(email, pass)
    }
    }}>
      Submit
    </button>
  </div>}
      
    </>
  )
};

