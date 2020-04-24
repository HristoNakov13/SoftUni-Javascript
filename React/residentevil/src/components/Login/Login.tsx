import React, { Fragment, useState, useContext, useMemo } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import useForm from "../../shared/hooks/use-form";
import validationSchema from "./login-validation-schema";
import getFirstError from "../../util/get-field-first-error";
import Credentials from "./credentials-interface";
import { UserContext } from "../../contexts/user/UserContext";

const initialState: Credentials = {
    username: "",
    password: ""
};

const Login: React.FC = () => {
    const [serverError, setServerError] = useState("");
    const { login } = useContext(UserContext);
    const history = useHistory();

    const onSubmit = (credentials: Credentials) => {
        login(credentials)
            .then(() => {
                history.push("/");
            }).catch(() => {
                setServerError("Incorrect username or password");
            });
    };

    const { submitHandler, changeHandler, errors } = useForm(initialState, validationSchema, onSubmit);


    const usernameError = useMemo(() => getFirstError("username", errors), [errors]);
    const passwordError = useMemo(() => getFirstError("password", errors), [errors]);

    return (
        <Fragment>
            <Form>
                <Form.Group controlId="username">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control onChange={changeHandler} type="text" name="username" tabIndex={1} autoFocus placeholder="Enter username..." />
                    {usernameError && <div className="error">{usernameError}</div>}
                    {serverError && <div className="error">{serverError}</div>}
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control onChange={changeHandler} type="password" name="password" tabIndex={2} placeholder="Password..." />
                    {passwordError && <div className="error">{passwordError}</div>}
                </Form.Group>

                <Button onClick={submitHandler} variant="primary" tabIndex={3} type="submit">Submit</Button>
            </Form>
        </Fragment>
    )
};

export default Login;