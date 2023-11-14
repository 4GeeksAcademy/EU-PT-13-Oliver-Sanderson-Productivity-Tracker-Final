import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Dashboard from "./Dashboard";
import Navbar from "../component/Navbar";
import "../../styles/home.css";




export const HomeOld = () => {
    const { store, actions } = useContext(Context);


    return (

        <div>
            <Navbar />
            <div className="text-center mt-5">

                <h1 className="titleA ">Home </h1>




            </div>
        </div>
    );
};




export default HomeOld;

