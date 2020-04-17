import React, { Fragment, useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../../shared/styles.css";
import { Redirect } from "react-router-dom";
import validationSchema from "./register-validation-schema";
import useForm from "../../shared/hooks/use-form";
import hasKey from "../../util/has-key";
import userService from "../../services/user-service";
import UserRegisterInterface from "./user-register-interface";

const initialState = {
    username: "",
    password: "",
    confirmPassword: ""
};

const Register: React.FC = () => {
    const [redirect, setRedirect] = useState("");

    const onSubmit = () => {
        const user: UserRegisterInterface = { ...state };

        userService.register(user)
            .then(() => {
                setRedirect("/login");
            }).catch(console.error);
    };

    const { state, errors, submitHandler, changeHandler } = useForm(initialState, validationSchema, onSubmit);

    const getFirstError = (fieldName: string): string => {
        return hasKey(errors, fieldName)
            ? errors[fieldName][0]
            : "";
    };

    const usernameError = getFirstError("username");
    const passwordError = getFirstError("password");
    const confirmPasswordError = getFirstError("confirmPassword");

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

                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control onChange={changeHandler} type="password" name="confirmPassword" placeholder="Confirm password..." />
                    {confirmPasswordError && <div className="error">{confirmPasswordError}</div>}
                </Form.Group>

                <Button onClick={submitHandler} variant="primary" type="submit">Submit</Button>
            </Form>
        </Fragment>
    )
};

export default Register;