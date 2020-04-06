import React from "react";

const withForm = (Component, initialState, validationSchema) => {
    return class extends React.Component {
        state = {
            form: initialState,
            errors: null
        }

        changeHandlerFactory = (name) => {
            let id;

            return (event) => {
                if (id) {
                    clearTimeout(id);
                    id = undefined;
                }
                const newValue = event.target.value;

                id = setTimeout(() => {
                    this.setState(({ form }) => {
                        return { form: { ...form, [name]: newValue } }
                    });
                    id = undefined;
                }, 300);
            }
        };

        getFormState = () => {
            return this.state.form;
        };

        getFormErrors = () => {
            return this.state.errors;
        }

        addFormError = (name, message) => {
            const errors = this.getFormErrors() || {};
            errors[name] = (errors[name] || []).concat(message);

            this.setState({ errors });
        }

        runValidations = () => {
            return validationSchema.validate(this.getFormState(), { abortEarly: false })
                .then(() => {
                    return this.getFormState();
                })
                .catch(err => {
                    const errors = err.inner.reduce((acc, { path, message }) => {
                        acc[path] = (acc[path] || []).concat(message);

                        return acc;
                    }, {});


                    this.setState({ errors });
                });
        }

        render() {
            return <Component
                {...this.props}
                changeHandlerFactory={this.changeHandlerFactory}
                getFormState={this.getFormState}
                runValidations={this.runValidations}
                getFormErrors={this.getFormErrors}
                addFormError={this.addFormError}
            />
        };
    };
}

export default withForm;