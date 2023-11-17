import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import Home  from "./pages/home";
import { Demo } from "./pages/demo";
import { Test } from "./pages/test";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import Footer from "./component/Footer";
import Login from "./pages/login";
import ContactUs from "./component/ContactUs";
import Navbar from "./component/Navbar";
import Dashboard from "./pages/Dashboard";
import PomodoroTimer from "./component/PomodoroTimer";
import TodoList from "./component/TodoList";
import Quotes from "./pages/quotes";
import Weather from "./component/Weather";
import WeatherComponent from "./component/WeatherComponent";
import Signup from "./pages/signup";


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
            <Route element={<Quotes />} path="/Quotes" />
            <Route element={<WeatherComponent />} path="/weather_Component" />
            <Route element={<Signup />} path="/signup" />
            <Route element={<h1>Not found!</h1>} />

          </Routes>
        </ScrollToTop>
      </BrowserRouter>

      <Footer/>

    </div>
  );
};

export default injectContext(Layout);