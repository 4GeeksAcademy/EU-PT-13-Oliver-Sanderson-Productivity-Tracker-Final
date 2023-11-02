const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			backend_url: "https://bug-free-dollop-94rw6v5767gfg64-3001.app.github.dev/",
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

			login: (email, password) => {
				const store = getStore();
				console.log("Bacon And Eggs")
				fetch( store.backend_url + "api/token", {
					method: "POST",
					headers: {"Content-Type": "application/json"},
					body: JSON.stringify({email: email, password: password}),
				}).then((recieved) => {
					if (recieved.ok) {
						alert("SUCCESS")
					} else {
						alert("FAIL")
					}
					return recieved.json()
				})
				.then((data) => {
					console.log(data)
				})
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
