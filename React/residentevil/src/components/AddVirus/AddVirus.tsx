import React, { Fragment, useEffect, useState } from "react";
import { Form, Col, Button } from "react-bootstrap";
import * as yup from "yup";

import virusService from "../../services/virus-service";
import Mutations from "./Mutations";
import Magnitudes from "./Magnitudes";
import Capitals from "./Capitals";
import onChangeFactory from "../../util/shared/form-onchange";

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
        affectedCapitals: affectedCapitals
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

    const submitHandler = (event: any) => {
        event.preventDefault();
        //todo validation and post req
    }

    return <Fragment>
        <Form>
            <Form.Group>
                <Form.Label>Name:</Form.Label>
                <Form.Control onChange={changeHandler} type="text" name="name" placeholder="Virus name..." />
            </Form.Group>
            <Form.Group>
                <Form.Label>Description:</Form.Label>
                <Form.Control as="textarea" onChange={changeHandler} name="description" rows="3" />
            </Form.Group>
            <Form.Group>
                <Form.Label>Side Effects:</Form.Label>
                <Form.Control type="text" name="sideEffects" placeholder="Side effects..." />
            </Form.Group>
            <Form.Group>
                <Form.Label>Creator:</Form.Label>
                <Form.Control onChange={changeHandler} type="text" name="creator" placeholder="Creator..." />
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
                    </Col>
                </Form.Group>
            </fieldset>
            <Form.Group>
                <Form.Label>Turnover Rate:</Form.Label>
                <Form.Control onChange={changeHandler} type="number" min={0} max={100} name="turnoverRate" />
            </Form.Group>
            <Form.Group>
                <Form.Label>Hours Until Turn:</Form.Label>
                <Form.Control onChange={changeHandler} type="number" min={1} max={12} name="hoursUntilTurn" />
            </Form.Group>
            <Form.Group>
                <Form.Label>Magnitude:</Form.Label>
                <Form.Control onChange={changeHandler} as="select" name="magnitude">
                    <option disabled selected>Select magnitude...</option>
                    <Magnitudes magnitudes={magnitudes} />
                </Form.Control>
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

// const validationSchema = yup.object().shape({
   
// });

export default AddVirus;