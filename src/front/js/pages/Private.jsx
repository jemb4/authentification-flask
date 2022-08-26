
import React, {useContext} from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom"
import { Link } from "react-router-dom"

export const Private = () => {
const {store, actions} = useContext(Context)

    return (
        <>
        {store.auth == true ? // borrar / modificar 
            <div className="text-center">
                <h1>Hi {store.name}</h1>
                <h2>This is a private web</h2>
            </div>
            : 
            <>
            <h1>Hi</h1>
            {alert("This web is private")}
            <Navigate to="/"/>
            </>
            

        }   
        </>
        
    )
};

export default Private