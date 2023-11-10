import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Test } from "./pages/test"
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Login from "./pages/login";
import ContactUs from "./component/ContactUs";
import Dashboard from "./pages/Dashboard";
import PomodoroTimer from "./component/PomodoroTimer";
import Weather from "./pages/Weather";
import TodoList from "./component/TodoList";



//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "https://musical-space-invention-97qgw5gx4pwfx9xx-3001.app.github.dev/") return <BackendURL />;

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
                        <Route element={<Test />} path="/test" />
                        <Route element={<Footer />} path="/Footer" />
                        <Route element={<ContactUs />} path="/ContactUs" />
                        <Route element={<PomodoroTimer />} path="/PomodoroTimer" />
                        <Route element={<Weather />} path="/Weather" />
                        <Route element={<TodoList />} path="/Todo_List" />
                        <Route element={<h1>Not found!</h1>} />

                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
            <Footer />
        </div>
    );
};

export default injectContext(Layout);