import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";

export const Test = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
            <p>TEST</p>
            <button onClick={() => console.log(actions.fetchLogin("test@test.com", "1234"))}>LOGIN TEST</button>
			<button onClick={() => console.log(actions.fetchUser())}>GET USER TEST</button>
			<button onClick={() => console.log(actions.fetchSessionsForUser())}>GET SESSIONS TEST</button>
			<button onClick={() => console.log(actions.fetchCurrentUserComplete())}>COMPLETE</button>
		</div>
	);
};