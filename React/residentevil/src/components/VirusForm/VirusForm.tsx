import React, { Fragment, useEffect, useState } from "react";
import { Form, Col, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import "../../shared/styles.css";

import virusService from "../../services/virus-service";
import Mutations from "./Mutations";
import Magnitudes from "./Magnitudes";
import Capitals from "./Capitals";
import validationSchema from "./virus-validation-schema";
import VirusInterface from "./virus-interface";
import InputElement from "../../shared/components/form/InputElement";
import TextArea from "../../shared/components/form/TextArea";
import useForm from "../../shared/hooks/use-form";
import hasKey from "../../util/has-key";

interface Props {
    initialState: any,
    submitFunc: Function
}

const VirusForm: React.FC<Props> = ({ initialState, submitFunc }, props: any) => {
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

    const [redirect, setRedirect] = useState("");

    const onSubmit = () => {
        const virus: VirusInterface = state;
        virus.capitals = affectedCapitals;

        submitFunc(virus).then((res: any) => {
            const virusId = res.id;
            setRedirect(`/viruses/${virusId}`);
        });
    };

    const { state, changeHandler, errors, submitHandler } = useForm(initialState, validationSchema, onSubmit);

    const [affectedCapitals, setAffectedCapitals] = useState<number[]>([]);
    const capitalsChangeHandler = (event: any) => {
        const selectedOptions: HTMLCollection = event.target.selectedOptions;
        const capitalIds: number[] = Array.from(selectedOptions)
            .map((e: any) => e.value);

        setAffectedCapitals(capitalIds);
    };

    const getFirstError = (fieldName: string): string => {
        return hasKey(errors, fieldName)
            ? errors[fieldName][0]
            : "";
    };

    const nameError = getFirstError("name");
    const descriptionError = getFirstError("description");
    const sideEffectsError = getFirstError("sideEffects");
    const creatorError = getFirstError("creator");
    const mutationError = getFirstError("mutation");
    const magnitudeError = getFirstError("magnitude");
    const turnoverRateError = getFirstError("turnoverRate");
    const hoursUntilTurnError = getFirstError("hoursUntilTurn");

    if (redirect) {
        return <Redirect to={redirect} />
    }

    //not sure if its redundant to split into such small components for every form element
    //its more lines of code thats for sure

    return <Fragment>
        <Form>
            <Form.Group>
                <InputElement
                    name="name"
                    type="text"
                    placeholder="Virus name..."
                    onChange={changeHandler}
                    className="form-control"
                    label="Name:"
                    labelClassName="form-label"
                    value={state.name}
                />
                {nameError && <div className="error">{nameError}</div>}
            </Form.Group>

            <Form.Group>
                <TextArea
                    name="description"
                    rows={3}
                    onChange={changeHandler}
                    className="form-control"
                    label="Description:"
                    labelClassName="form-label"
                    textContent={state.description}
                />
                {descriptionError && <div className="error">{descriptionError}</div>}
            </Form.Group>

            <Form.Group>
                <InputElement
                    name="sideEffects"
                    type="text"
                    placeholder="Side effects..."
                    onChange={changeHandler}
                    className="form-control"
                    label="Side Effects:"
                    labelClassName="form-label"
                    value={state.sideEffects}
                />
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
                <Form.Control onChange={capitalsChangeHandler} as="select" multiple name="capitals">
                    <Capitals capitals={capitals} />
                </Form.Control>
            </Form.Group>

            <Button onClick={submitHandler} type="submit">Add Virus</Button>
        </Form>
    </Fragment>
};

export default VirusForm;