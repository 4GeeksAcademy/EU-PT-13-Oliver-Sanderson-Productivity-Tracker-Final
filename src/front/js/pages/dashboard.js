import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";
import "../../styles/home.css";

export const Dashboard = () => {
	const { store, actions } = useContext(Context);
	const [gotToken, setGotToken] = useState(store.token)
	const [theUsersInfo, setTheUsersInfo] = useState(null)
	const [theSessions, setTheSessions] = useState(null)

	if (!gotToken) {
		console.log("Redirecting to login.")
		return <Navigate to="/login" />
	}

	useEffect(() => {
		actions.fetchCurrentUserComplete()
	}, []);







	return (
		<div className="loginBase">
			<div className="text-center mt-5">
				<h1>Welcome to Dashboard</h1>
				<h2>User {store.current_user.name}</h2>
				<h2>Session date {store.current_sessions[0] ? store.current_sessions[0].date : "loading"}</h2>
			</div>
		</div>
	);
};
