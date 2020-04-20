import React, { Fragment, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

import useForm from "../../shared/hooks/use-form";
import validationSchema from "./login-validation-schema";
import getFirstError from "../../util/get-field-first-error";
import Credentials from "./credentials-interface";
import userService from "../../services/user-service";

const initialState = {
    username: "",
    password: ""
};

const Login: React.FC = () => {
    const [redirect, setRedirect] = useState("");
    const [serverError, setServerError] = useState("");

    const onSubmit = (state: any) => {
        const credentials: Credentials = { ...state };

        userService.login(credentials)
            .then((response) => {
                console.log(response);
                // setRedirect("/");

            }).catch(err => {
                console.log(err);
            })

    };

    const { state, submitHandler, changeHandler, errors } = useForm(initialState, validationSchema, onSubmit);

    const usernameError = getFirstError("username", errors);
    const passwordError = getFirstError("password", errors);

    if (redirect) {
        return <Redirect to={redirect} />;
    }

    return (
        <Fragment>
            <Form>
                <Form.Group controlId="username">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control onChange={changeHandler} type="text" name="username" placeholder="Enter username..." />
                    {usernameError && <div className="error">{usernameError}</div>}
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control onChange={changeHandler} type="password" name="password" placeholder="Password..." />
                    {passwordError && <div className="error">{passwordError}</div>}
                </Form.Group>

                <Button onClick={submitHandler} variant="primary" type="submit">Submit</Button>
            </Form>
        </Fragment>
    )
};

export default Login;