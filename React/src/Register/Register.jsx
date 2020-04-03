import React from "react";
import "../shared/styles/Login-Register.css";

const Register = () => {
    return <form className="Register">
        <h1>Register</h1>
        <div className="form-control">
            <label for="username">Username</label>
            <input id="username" type="text" />
        </div>
        <div className="form-control">
            <label for="password">Password</label>
            <input id="password" type="password" />
        </div>
        <div className="form-control">
            <label for="repeatPassword">Repeat Password</label>
            <input id="repeatPassword" type="password" />
        </div>
        <div className="form-control">
            <button type="submit">Register</button>
        </div>
    </form>
}

export default Register;