const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			current_user: {},
			current_sessions: [],
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

			fetchSignUp: (fName, lName, email, password) => {
				console.log("SIGN UP CALLED")
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

			fetchLogin: async (email, password) => {
				try{
					const resp = await fetch(process.env.BACKEND_URL + "/api/token", {
						method: "POST",
						headers: {"Content-Type": "application/json"},
						body: JSON.stringify({email: email, password: password}),
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
					console.log("Error fetching users details. ", error)
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

			fetchCurrentUserComplete: async () => {
				await getActions().fetchUser()
				await getActions().fetchSessionsForUser()
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
