import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";
 


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); 
  const [redirectLogin, setRedirectLogin] = useState(false)

  const { store, actions } = useContext(Context);
  

  const handleLogin = async (e) => {
    e.preventDefault();

      function fetchPromise() {
        return new Promise((resolve) => {
          setError("")
          let successCheck = false
          console.log(process.env.BACKEND_URL + "api/token")
          fetch( process.env.BACKEND_URL + "api/token", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email: email, password: password}),
          }).then((recieved) => {
            if (recieved.ok) {
              successCheck = true
            } else {
              successCheck = false
            }
            return recieved.json()
          })
          .then((data) => {
            if (successCheck) {
              store.token = data["access_token"]
              store.current_user["email"] = email
              resolve(true)
            } else {
              setError(data["message"])
              setEmail("")
              setPassword("")
            }
          })
        })
      }
      
      async function runFunction() {
        const promiseResult = await fetchPromise();
        if (promiseResult) {
          setRedirectLogin(true)

        }
      }
      
      
      runFunction();
    

  };

  if (redirectLogin) {
		console.log("Redirecting to dashboard.")
		return <Navigate to="/dashboard" />
	}

  

  return (
    <div>
  
        <div className="loginBase weather-box">
          <div className="loginBox">
            <h3>Login</h3>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  <b>Email</b>
                </label>
                <input
                  type="email"
                  className="form-control typeBoxLogin"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                <b>Password</b>
                </label>
                <input
                  type="password"
                  className="form-control typeBoxLogin"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && <div className="alert alert-danger">{error}</div>}
              <div className="btnBox">
              <button type="submit" className="btn setbtn">
                Login
              </button>
            

            <Link to="/">
              <span className="btn setbtn" href="#" role="button">
                Password Recovery

              </span>
            </Link>
            </div>
            </form>
          </div>
        </div>
    </div>
  );
};

export default Login;
