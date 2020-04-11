import React, { Fragment, useEffect, useState } from "react";
import { Form, Col, Button } from "react-bootstrap";
import "../../shared/styles.css";
import * as yup from "yup";

import virusService from "../../services/virus-service";
import Mutations from "./Mutations";
import Magnitudes from "./Magnitudes";
import Capitals from "./Capitals";
import validationSchema from "./virus-validation-schema";
import VirusInterface from "./virus-interface";
import Virus from "../ShowViruses/Virus";

const AddVirus: React.FC = () => {
    const [mutations, setMutations] = useState<string[]>([]);
    const [magnitudes, setMagnitudes] = useState<string[]>([]);
    const [capitals, setCapitals] = useState<any[]>([]);

    useEffect(() => {
        virusService.getAvailableMutations().then(availableMutations => {
            setMutations(availableMutations);
        });

        virusService.getAvailableMagnitudes().then(magnitudes => {
            setMagnitudes(magnitudes);
        });

        virusService.getAvailableCapitals().then(capitals => {
            setCapitals(capitals);
        });
    }, []);

    const affectedCapitals: number[] = [];
    const errors: any = {};

    const [state, setState] = useState({
        name: "",
        description: "",
        sideEffects: "",
        creator: "",
        isCurable: false,
        isDeadly: false,
        mutation: "",
        turnoverRate: 0,
        hoursUntilTurn: 0,
        magnitude: "",
        affectedCapitals: affectedCapitals,
        errors: errors
    });

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

            id = setTimeout(() => {
                setState(prev => ({
                    ...prev,
                    [name]: value
                }));

                id = undefined;
            }, 400);
        }
    })();

    const capitalsChangeHandler = (event: any) => {
        const selectedOptions: HTMLCollection = event.target.selectedOptions;
        const capitalIds = Array.from(selectedOptions).map((e: any) => e.value);

        setState(prev => ({
            ...prev,
            affectedCapitals: capitalIds
        }));
    }

    const getFirstError = (fieldName: string): string => {
        const errors = state.errors;

        return errors && errors[fieldName] && errors[fieldName][0];
    }

    const createVirus = (virus: VirusInterface) => {
        virusService.createVirus(virus);

    }

   

    const validateForm = (schema: yup.ObjectSchema) => {
        schema.validate(state, { abortEarly: false })
            .then(() => {
                const virus: VirusInterface = state;

                createVirus(virus);
             })
            .catch((err: yup.ValidationError) => {
                const errors: any = err.inner.reduce((acc: any, { path, message }) => {
                    acc[path] = (acc[path] || []).concat(message);

                    return acc;
                }, {});

                setState(prev => ({
                    ...prev,
                    errors
                }));
            })
    }

    const submitHandler = (event: any) => {
        event.preventDefault();
        validateForm(validationSchema);

    }

    

    const nameError = getFirstError("name");
    const descriptionError = getFirstError("description");
    const sideEffectsError = getFirstError("sideEffects");
    const creatorError = getFirstError("creator");
    const mutationError = getFirstError("mutation");
    const magnitudeError = getFirstError("magnitude");
    const turnoverRateError = getFirstError("turnoverRate");
    const hoursUntilTurnError = getFirstError("hoursUntilTurn");
    const releasedOnError = getFirstError("releasedOn");

    return <Fragment>
        <Form>
            <Form.Group>
                <Form.Label>Name:</Form.Label>
                <Form.Control onChange={changeHandler} type="text" name="name" placeholder="Virus name..." />
                {nameError && <div className="error">{nameError}</div>}
            </Form.Group>
            <Form.Group>
                <Form.Label>Description:</Form.Label>
                <Form.Control as="textarea" onChange={changeHandler} name="description" rows="3" />
                {descriptionError && <div className="error">{descriptionError}</div>}
            </Form.Group>
            <Form.Group>
                <Form.Label>Side Effects:</Form.Label>
                <Form.Control type="text" name="sideEffects" placeholder="Side effects..." />
                {sideEffectsError && <div className="error">{sideEffectsError}</div>}
            </Form.Group>
            <Form.Group>
                <Form.Label>Creator:</Form.Label>
                <Form.Control onChange={changeHandler} type="text" name="creator" placeholder="Creator..." />
                {creatorError && <div className="error">{creatorError}</div>}
            </Form.Group>
            <Form.Group >
                <Form.Check onChange={changeHandler} type="checkbox" name="isCurable" label="Is Curable?" />
            </Form.Group>
            <Form.Group>
                <Form.Check onChange={changeHandler} type="checkbox" name="isDeadly" label="Is Deadly?" />
            </Form.Group>
            <fieldset>
                <Form.Group onChange={changeHandler}>
                    <Col>
                        <Mutations mutations={mutations} />
                        {mutationError && <div className="error">{mutationError}</div>}
                    </Col>
                </Form.Group>
            </fieldset>
            <Form.Group>
                <Form.Label>Turnover Rate:</Form.Label>
                <Form.Control onChange={changeHandler} type="number" min={0} max={100} name="turnoverRate" />
                {turnoverRateError && <div className="error">{turnoverRateError}</div>}
            </Form.Group>
            <Form.Group>
                <Form.Label>Hours Until Turn:</Form.Label>
                <Form.Control onChange={changeHandler} type="number" min={1} max={12} name="hoursUntilTurn" />
                {hoursUntilTurnError && <div className="error">{hoursUntilTurnError}</div>}
            </Form.Group>
            <Form.Group>
                <Form.Label>Magnitude:</Form.Label>
                <Form.Control onChange={changeHandler} as="select" name="magnitude">
                    <option disabled selected>Select magnitude...</option>
                    <Magnitudes magnitudes={magnitudes} />
                </Form.Control>
                {magnitudeError && <div className="error">{magnitudeError}</div>}
            </Form.Group>
            <Form.Group>
                <Form.Label>Affected Capitals:</Form.Label>
                <Form.Control onChange={capitalsChangeHandler} as="select" multiple name="affectedCapitals">
                    <Capitals capitals={capitals} />
                </Form.Control>
            </Form.Group>
            <Button onClick={submitHandler} type="submit">Add Virus</Button>
        </Form>
    </Fragment>
};


export default AddVirus;