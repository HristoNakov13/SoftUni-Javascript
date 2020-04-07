import React from "react";
import * as yup from "yup";
import "../shared/styles/Login-Register.css";

import withForm from "../shared/hoc/with-form";
import userService from "../services/user-service/user-service";



class Login extends React.Component {

    usernameChangeHandler = this.props.changeHandlerFactory("username");
    passwordChangeHandler = this.props.changeHandlerFactory("password");

    submitHandler = (event) => {
        event.preventDefault();

        this.props.runValidations()
            .then(formData => {
                if (!formData) {
                    return;
                }

                userService.login(formData).then(res => {
                    if (res.status === 200) {
                        this.props.history.push("/");

                        return;
                    } else if (res.status === 401) {
                        this.props.addFormError("username", "Wrong username/password.");
                    }
                })
            });
    }

    getFirstInputError = (name) => {
        const errors = this.props.getFormErrors();

        return errors && errors[name] && errors[name][0];
    }

    render() {
        const usernameError = this.getFirstInputError("username");
        const passwordError = this.getFirstInputError("password");

        return <form className="Login">
            <h1>Login</h1>
            <div className="form-control">
                <label htmlFor="username">Username</label>
                <input id="username" type="text" onChange={this.usernameChangeHandler} />
                {usernameError && <div className="error">{usernameError}</div>}
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input id="password" type="password" onChange={this.passwordChangeHandler} />
                {passwordError && <div className="error">{passwordError}</div>}
            </div>
            <div className="form-control">
                <button type="submit" onClick={this.submitHandler}>Login</button>
            </div>
        </form>
    }
}

const initialForm = {
    username: "",
    password: "",
}

const validationSchema = yup.object().shape({
    username: yup.string()
        .required("Username is required."),

    password: yup.string()
        .required("Password is required."),
})

export default withForm(Login, initialForm, validationSchema);