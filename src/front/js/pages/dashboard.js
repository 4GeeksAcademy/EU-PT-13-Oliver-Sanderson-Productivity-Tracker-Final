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

		function getUser() {
		return new Promise((resolve) => {
		fetch( store.backend_url + "api/users", {
        method: "GET",
        headers: {"Authorization": "Bearer " + gotToken},
    	})
    	.then((recieved) => {
			  //TODO if not ok
        	return recieved.json()
   		 })
    	.then((data) => {
        	let theUser
        	data.forEach(element => {
            	if( store.current_user["email"]  == element["email"]) {
                	theUser = element
            	}
        });
        store.current_user = theUser
		setTheUsersInfo(theUser)
        resolve(true)
   		 })
    	.catch((error) => console.log(error))
		})}

		function getSessions() {
		fetch( store.backend_url + "api/sessions", {
			method: "GET",
			headers: {"Authorization": "Bearer " + gotToken},
			})
			.then((recieved) => {
				 //TODO if not ok
				return recieved.json()
				})
			.then((data) => {
				let theSessions = []
				data.forEach(element => {

					if( store.current_user["id"] == element["user_id"]) {
						theSessions.push(element)
					}
			});
			store.current_sessions = theSessions
			setTheSessions(theSessions)
			console.log(store.current_sessions)
			return data
				})
			.catch((error) => console.log(error))
		}

			async function runFunction() {
				const promiseResult = await getUser();
				if (promiseResult) {
					getSessions()
				}
			  }
			  
			  
			runFunction();

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
