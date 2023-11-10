import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Dashboard from "./Dashboard";

import "../../styles/home.css";




export const Home = () => {
    const { store, actions } = useContext(Context);


    return (
       <div>
       
        <div className="text-center mt-5">


            <h1 className="titleA ">Home </h1>
           
           
           
       
        </div>
        </div>
    );
};




export default Home;

