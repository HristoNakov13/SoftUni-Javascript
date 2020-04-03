import React from "react";
import "../shared/styles/Login-Register.css";

const Login = () => {
    return <form className="Login">
        <h1>Login</h1>
        <div className="form-control">
            <label for="username">Username</label>
            <input id="username" type="text" />
        </div>
        <div className="form-control">
            <label for="password">Password</label>
            <input id="password" type="password" />
        </div>
        <div className="form-control">
            <button type="submit">Login</button>
        </div>
    </form>
}

export default Login;