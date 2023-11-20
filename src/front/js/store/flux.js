const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			current_user: {},
			current_sessions: [],
			current_tasks: [],
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},

			Logout: () => {
				setStore({ token: null })
				setStore({ current_user: {} })
			},

			fetchDeleteTask: async(deleteID) => {
				console.log(deleteID)
				const store = getStore();

				try {
					const resp = await fetch(process.env.BACKEND_URL + "api/tasks", {
						method: "DELETE",
						headers: { "Authorization": "Bearer " + store.token, "Content-Type": "application/json"},
						body: JSON.stringify(
							{
								id : deleteID
							})
					})
					const data = await resp.json()
					console.log(data)
					return data;
				}
				catch(error) {
					console.log("AN ERROR")
				}

			},

			fetchSendTask: async (taskObject) => {
				const store = getStore();

				console.log(taskObject)
				console.log(store.token)

				try{
					const resp = await fetch(process.env.BACKEND_URL + "api/tasks", {
						method: "POST",
						headers: { "Authorization": "Bearer " + store.token, "Content-Type": "application/json"},
						body: JSON.stringify(
							{
								user_id : taskObject["user_id"],
								page_name : taskObject["page_name"],
								page_link : taskObject["page_link"],
								frequency : taskObject["frequency"],
								start_date : taskObject["start_date"],
								end_date : taskObject["end_date"],
								reward_name : taskObject["reward_name"],
								reward_link : taskObject["reward_link"],
								reward_duration : taskObject["reward_duration"]
							}
						)

					})
					const data = await resp.json()
					console.log(data)
					return data;
				}
				catch(error) {
					console.log("AN ERROR")
				}
			},

			fetchSignUp: (fName, lName, email, password) => {
				fetch(process.env.BACKEND_URL + "api/signup", {
					method: "POST",
					headers: {"Content-Type": "application/json"},
					body: JSON.stringify({name: fName, last_name: lName, email: email, password: password}),
				}).then((recieved) => {
					// TODO check if ok
					if(recieved.ok) {
						console.log("User created!")
					}
					return recieved.json()
				  })
				  .then((data) => {
					return data
				  }).catch((error) => console.log(error))
			},
			fetchContactUs: ( email, message) => {
				console.log("CONTACT US CALLED")
				fetch(process.env.BACKEND_URL + "api/contactus", {
					method: "POST",
					headers: {"Content-Type": "application/json"},
					body: JSON.stringify({ email: email, message: message}),
				}).then((recieved) => {
					// TODO check if ok
					if(recieved.ok) {
						console.log("Information Saved!")
					}
					return recieved.json()
				  })
				  .then((data) => {
					return data
				  }).catch((error) => console.log(error))
			},

			fetchLogin: async (email, password) => {
				try{
					const resp = await fetch(process.env.BACKEND_URL + "/api/token", {
						method: "POST",
						headers: {"Content-Type": "application/json"},
						body: JSON.stringify({email: email, paßssword: password}),
					})
					const data = await resp.json()
					setStore({ token: data.access_token })
					setStore({ current_user: {"email": email} })
					console.log(getStore())
					return data;
				}
				catch(error) {
					console.log("Error fetching users details. ", error)
				}
			},

			fetchUser: async () => {
				const store = getStore();
				try{
					const resp = await fetch(process.env.BACKEND_URL + "/api/users", {
						method: "GET",
						headers: { "Authorization": "Bearer " + store.token},
					})
					const data = await resp.json()
					let theUser
					data.forEach(element => {
						if( store.current_user["email"]  == element["email"]) {
							theUser = element
						}
					});
					setStore({current_user : theUser})
					return data;
				}
				catch(error) {
					const real = error.json()
					console.log("Error fetching users details. ", real)
				}
			},

			fetchSessionsForUser: async () => {
				const store = getStore();
				try{
					const resp = await fetch(process.env.BACKEND_URL + "/api/sessions", {
						method: "GET",
						headers: { "Authorization": "Bearer " + store.token},
					})
					const data = await resp.json()
					let currentUserSessions = []
					data.forEach(element => {
						if( store.current_user["id"]  == element["user_id"]) {
							currentUserSessions.push(element)
						}
					});
					setStore({current_sessions : currentUserSessions})
					return data;
				}
				catch(error) {
					console.log("Error fetching sessions details. ", error)
				}
			},

			fetchTasksForUser: async (user_id) => {
				const store = getStore();
				try{
					const resp = await fetch(process.env.BACKEND_URL + "api/tasks",{
						headers: { "Authorization": "Bearer " + store.token}
					})
					const data = await resp.json()
					let currentUserTasks = []
					data.forEach(element => {
						if( store.current_user["id"]  == element["user_id"]) {
							currentUserTasks.push(element)
						}
					});
					setStore({current_tasks : currentUserTasks})
					return data;
				}
				catch(error) {
					console.log("AN ERROR")
				}
			},

			fetchCurrentUserComplete: async () => {
				await getActions().fetchUser()
				await getActions().fetchSessionsForUser()
				await getActions().fetchTasksForUser()
				console.log(getStore())
			},

			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
