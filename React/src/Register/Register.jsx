import React from "react";
import * as yup from "yup";

import "../shared/styles/Login-Register.css";
import withForm from "../shared/hoc/with-form";

import userService from "../services/user-service/user-service";


class Register extends React.Component {

    usernameChangeHandler = this.props.changeHandlerFactory("username");
    passwordChangeHandler = this.props.changeHandlerFactory("password");
    repeatPasswordChangeHandler = this.props.changeHandlerFactory("repeatPassword");

    submitHandler = (event) => {
        event.preventDefault();

        this.props.runValidations()
            .then(formData => {
                if (!formData) {
                    return;
                }

                userService.register(formData).then(response => {
                    if (response.status === 200) {
                        this.props.history.push("/users/login");

                        return;
                    }

                    this.props.history.push(`/${response.status}`)
                });
            });
    }

    getFirstInputError = (name) => {
        const errors = this.props.getFormErrors();

        return errors && errors[name] && errors[name][0];
    }


    render() {
        const usernameError = this.getFirstInputError("username");
        const passwordError = this.getFirstInputError("password");
        const repeatPasswordError = this.getFirstInputError("repeatPassword");

        return <form className="Register">
            <h1>Register</h1>
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
                <label htmlFor="repeatPassword">Repeat Password</label>
                <input id="repeatPassword" type="password" onChange={this.repeatPasswordChangeHandler} />
                {repeatPasswordError && <div className="error">{repeatPasswordError}</div>}
            </div>
            <div className="form-control">
                <button type="submit" onClick={this.submitHandler}>Register</button>
            </div>
        </form>
    }
}

const initialFormState = {
    username: "",
    password: "",
    repeatPassword: "",
}

const validationSchema = yup.object().shape({
    username: yup.string()
        .required("Username is required.")
        .min(3, "Username must be atleast 3 symbols long."),

    password: yup.string()
        .required("Password is required.")
        .min(3, "Password must be atleast 3 symbols long."),

    repeatPassword: yup.string()
        .oneOf([yup.ref("password"), null], "Passwords don't match")
        .required("Repeat password is required.")
        .min(3, "Password must be atleast 3 symbols long.")
});

export default withForm(Register, initialFormState, validationSchema);