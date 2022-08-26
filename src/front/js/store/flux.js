import config from "../config.js"

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
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
			],
			message: null,
			name: null,
			auth: false,
			token: "token",
			userToken: localStorage.getItem("jwt-token") ?? "",
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
			},
			login: (email, password) => {
				fetch(`${config.hostname}/api/login`, {
					method: 'POST',
					body: JSON.stringify({email, password}),
					headers: {
						'Content-Type': 'application/json'
					}
					
				})
				.then(res => {
					if (res.status == 200){
						setStore({auth: true})
						setStore({name: email})
					} else {
						alert("Usuario o clave incorrectas")
						return "Usuario o clave incorrectas"
					}
					return res.json()
				})
				.then(data => {
					localStorage.setItem("token", data)
					setStore({token: data})
				})
				.catch()
			},
			getToken: () => {
				setStore({
				  token: localStorage.getItem("jwt-token") ?? null,
				});
			  },

			logout: () => {
				localStorage.removeItem("token")
				setStore({auth: false})
				setStore({name: null})
			},

			signup: (email, password) => {
				fetch(`${config.hostname}/api/signup`,{
					method: 'POST',
					body: JSON.stringify({email, password}),
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(res => {
					if (res.status == 200){
						setStore({auth: true}) 
						setStore({name: email})
						
					} else {
						alert("This email already exist")
						return "This email already exist"
					}
					return res.json()
				})
				.then(data =>{ 
					localStorage.setItem("token", data)
					setStore({token: data})
				})
			},

			private: () => {
				let tok = localStorage.getItem("token")
				if(tok == getStore().token){

				fetch(`${config.hostname}/api/private`,{
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + tok
					}
				})
				.then(res => {
					if(res.status == 200){
						console.log("Todo bien con el fetch en private")
					} else{
						console.log("Algo ha ido mal con el token y el require en el private Fetch")
						// return res.json()
					}

				})} else {
					return "Validation error flux 97"
				}

			},
		}
	};
};

export default getState;
