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
import getFirstError from "../../util/get-field-first-error";

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

    const onSubmit = (state: any) => {
        const virus: VirusInterface = state;
        virus.capitals = affectedCapitals;


        submitFunc(virus).then((res: any) => {
            const virusId = res.id;
            setRedirect(`/viruses/${virusId}`);
        });
    };

    const { state, changeHandler, errors, submitHandler } = useForm(initialState, validationSchema, onSubmit);

    const [affectedCapitals, setAffectedCapitals] = useState<string[]>([]);
    const capitalsChangeHandler = (event: any) => {
        const selectedOptions: HTMLCollection = event.target.selectedOptions;
        const capitalIds: string[] = Array.from(selectedOptions)
            .map((e: any) => e.value);

        setAffectedCapitals(capitalIds);
    };

    const nameError = getFirstError("name", errors);
    const descriptionError = getFirstError("description", errors);
    const sideEffectsError = getFirstError("sideEffects", errors);
    const creatorError = getFirstError("creator", errors);
    const mutationError = getFirstError("mutation", errors);
    const magnitudeError = getFirstError("magnitude", errors);
    const turnoverRateError = getFirstError("turnoverRate", errors);
    const hoursUntilTurnError = getFirstError("hoursUntilTurn", errors);

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
                <Form.Control onChange={changeHandler} type="text" value={state.creator} name="creator" placeholder="Creator..." />
                {creatorError && <div className="error">{creatorError}</div>}
            </Form.Group>

            <Form.Group >
                <Form.Check onChange={changeHandler} type="checkbox" checked={state.isCurable} name="isCurable" label="Is Curable?" />
            </Form.Group>

            <Form.Group>
                <Form.Check onChange={changeHandler} type="checkbox" checked={state.isDeadly} name="isDeadly" label="Is Deadly?" />
            </Form.Group>

            <fieldset>
                <Form.Group onChange={changeHandler}>
                    <Col>
                        <Mutations mutations={mutations} selected={state.mutation} />
                        {mutationError && <div className="error">{mutationError}</div>}
                    </Col>
                </Form.Group>
            </fieldset>

            <Form.Group>
                <Form.Label>Turnover Rate:</Form.Label>
                <Form.Control onChange={changeHandler} type="number" value={state.turnoverRate} min={0} max={100} name="turnoverRate" />
                {turnoverRateError && <div className="error">{turnoverRateError}</div>}
            </Form.Group>

            <Form.Group>
                <Form.Label>Hours Until Turn:</Form.Label>
                <Form.Control onChange={changeHandler} type="number" value={state.hoursUntilTurn} min={1} max={12} name="hoursUntilTurn" />
                {hoursUntilTurnError && <div className="error">{hoursUntilTurnError}</div>}
            </Form.Group>

            <Form.Group>
                <Form.Label>Magnitude:</Form.Label>
                <Form.Control onChange={changeHandler} as="select" name="magnitude">
                    <option disabled selected>Select magnitude...</option>
                    <Magnitudes magnitudes={magnitudes} selected={state.magnitude} />
                </Form.Control>
                {magnitudeError && <div className="error">{magnitudeError}</div>}
            </Form.Group>

            <Form.Group>
                <Form.Label>Affected Capitals:</Form.Label>
                <Form.Control onChange={capitalsChangeHandler} as="select" multiple name="capitals">
                    <Capitals capitals={capitals} selected={state.capitals[0] && state.capitals[0].id ? state.capitals.map((c: any) => c.id) : state.capitals} />
                </Form.Control>
            </Form.Group>

            <Button onClick={submitHandler} type="submit">Submit</Button>
        </Form>
    </Fragment>
};

export default VirusForm;