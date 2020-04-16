import { useState, useEffect } from "react";
import * as yup from "yup";

const useForm = (initialState: any, validationSchema: yup.ObjectSchema, onSubmit: any) => {
    const [state, setState] = useState({ ...initialState });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setState(initialState);
    }, [initialState]);

    const changeHandler = (() => {
        let id: any;

        return (event: any): void => {
            if (id) {
                clearTimeout(id);
                id = undefined;
            }
            const { target, name = target.name } = event;

            const value = target.type === "checkbox"
                ? target.checked
                : target.value;
                
                setState((prev: any) => ({
                    ...prev,
                    [name]: value
                }));

            id = setTimeout(() => {
                //validation
                id = undefined;
            }, 400);
        }
    })();

    const handleErrors = (err: yup.ValidationError) => {
        console.log("tuk", err);
        const errors: any = err.inner.reduce((acc: any, { path, message }) => {
            acc[path] = (acc[path] || []).concat(message);

            return acc;
        }, {});

        setErrors(errors);
    }

    const submitHandler = (event: any) => {
        event.preventDefault();
        validationSchema.validate(state, { abortEarly: false })
            .then(onSubmit)
            .catch(handleErrors);
    }

    return {
        state,
        errors,
        changeHandler,
        submitHandler,
    }
}

export default useForm;