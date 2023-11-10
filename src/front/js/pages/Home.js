import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Dashboard from "./Dashboard";

import "../../styles/home.css";




export const Home = () => {
    const { store, actions } = useContext(Context);


    return (
       <div>
       
        <div className="text-center mt-5">


            <h1 className="titleA ">My Activity </h1>
           
            <Dashboard/> 
           
           
       
        </div>
        </div>
    );
};




export default Home;

