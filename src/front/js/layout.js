import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import Home  from "./pages/home";
import { Demo } from "./pages/demo";

import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import Footer from "./component/Footer";
import Login from "./pages/login";
import ContactUs from "./component/ContactUs";
import Navbar from "./component/Navbar";
import Dashboard from "./pages/dashboard";
import PomodoroTimer from "./component/PomodoroTimer";
import { Test } from "./pages/test";

import Quotes from "./pages/quotes";

import WeatherComponent from "./component/WeatherComponent";
import Signup from "./pages/signup";
import TaskCard from "./component/TaskCard";


const Layout = () => {

  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL) return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Navbar />} path="/Navbar" />
            <Route element={<Demo />} path="/demo" />
            <Route element={<Single />} path="/single/:theid" />
            <Route element={<Login />} path="/login" />
            <Route element={<Dashboard />} path="/dashboard" />
            <Route element={<ContactUs />} path="/ContactUs" />
            <Route element={<PomodoroTimer />} path="/PomodoroTimer" />
            <Route element={<TaskCard/>} path="/TaskCard" />
            <Route element={<Quotes />} path="/Quotes" />
            <Route element={<WeatherComponent />} path="/WeatherComponent" />
            <Route element={<Signup />} path="/signup" />
            <Route element={<Test />} path="/test" />
            <Route element={<h1>Not found!</h1>} />

          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    
    </div>
  );
};

export default injectContext(Layout);