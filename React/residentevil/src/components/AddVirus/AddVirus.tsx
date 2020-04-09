import React, { Fragment, useEffect, useState } from "react";
import { Form, Col, Button } from "react-bootstrap";

import virusService from "../../services/virus-service";
import Mutations from "./Mutations";
import Magnitudes from "./Magnitudes";
import Capitals from "./Capitals";

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

    const [name, setName] = useState("");

    const changeHandler = (event: React.FormEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value);
        console.log(name);
    }

    return <Fragment>
        <Form>
            <Form.Group controlId="name">
                <Form.Label>Name:</Form.Label>
                <Form.Control onChange={changeHandler} type="text" placeholder="Virus name..." />
            </Form.Group>
            <Form.Group controlId="description">
                <Form.Label>Description:</Form.Label>
                <Form.Control as="textarea" rows="3" />
            </Form.Group>
            <Form.Group controlId="sideEffects">
                <Form.Label>Side Effects:</Form.Label>
                <Form.Control type="text" placeholder="Side effects..." />
            </Form.Group>
            <Form.Group controlId="creator">
                <Form.Label>Creator:</Form.Label>
                <Form.Control type="text" placeholder="Creator..." />
            </Form.Group>
            <Form.Group controlId="isCurable">
                <Form.Check type="checkbox" label="Is Curable?" />
            </Form.Group>
            <Form.Group controlId="isDeadly">
                <Form.Check type="checkbox" label="Is Deadly?" />
            </Form.Group>
            <fieldset>
                <Form.Group>
                    <Col>
                        <Mutations mutations={mutations} />
                    </Col>
                </Form.Group>
            </fieldset>
            <Form.Group controlId="turnoverRate">
                <Form.Label>Turnover Rate:</Form.Label>
                <Form.Control type="number" />
            </Form.Group>
            <Form.Group controlId="turnoverRate">
                <Form.Label>Turnover Rate:</Form.Label>
                <Form.Control type="number" min={0} max={100} />
            </Form.Group>
            <Form.Group controlId="hoursUntilTurn">
                <Form.Label>Hours Until Turn:</Form.Label>
                <Form.Control type="number" min={1} max={12} />
            </Form.Group>
            <Form.Group controlId="magnitude">
                <Form.Label>Magnitude:</Form.Label>
                <Form.Control as="select">
                    <option disabled selected>Select magnitude...</option>
                    <Magnitudes magnitudes={magnitudes} />
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="capitals">
                <Form.Label>Affected Capitals:</Form.Label>
                <Form.Control as="select" multiple>
                    <Capitals capitals={capitals} />
                </Form.Control>
            </Form.Group>
            <Button type="submit">Add Virus</Button>
        </Form>
    </Fragment>
};

export default AddVirus;