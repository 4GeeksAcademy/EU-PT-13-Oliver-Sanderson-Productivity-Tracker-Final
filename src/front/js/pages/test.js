// import React, { useState, useContext, useEffect } from "react";
// import { Context } from "../store/appContext";

// export const Test = () => {
// 	const { store, actions } = useContext(Context);

// 	const theTask = {
// 		"user_id" : 1,
// 		"page_name" : "The page",
// 		"page_link" : "URL.com",
// 		"frequency" : "daily",
// 		"start_date" : "1000-01-01 00:00:00",
// 		"end_date" : "9999-12-31 23:59:59",
// 		"reward_name" : "Play Game",
// 		"reward_link" : "www.games.com",
// 		"reward_duration" : 300
// 	}

// 	return (
// 		<div className="text-center mt-5">
//             <p>TEST</p>
//             <button onClick={() => console.log(actions.fetchLogin("test@test.com", "1234"))}>LOGIN TEST</button>
// 			<button onClick={() => console.log(actions.fetchUser())}>GET USER TEST</button>
// 			<button onClick={() => console.log(actions.fetchSessionsForUser())}>GET SESSIONS TEST</button>
// 			<button onClick={() => console.log(actions.fetchCurrentUserComplete())}>COMPLETE</button>
// 			<button onClick={() => console.log(actions.fetchSendTask(theTask))}> SEND EXAMPLE TASK</button>
// 		</div>
// 	);
// };


import React, { useState, useEffect } from 'react';

export const Test = () => {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
	console.log("TESTTESTTESTTSET")
  }, []);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}