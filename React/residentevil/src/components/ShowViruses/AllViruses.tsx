import React, { Fragment, useEffect, useState } from "react";
import { Table } from "react-bootstrap";

import virusService from "../../services/virus-service";
import Virus from "./Virus";



const AllViruses: React.FC = () => {
    const [viruses, setViruses] = useState<any[]>([]);

    useEffect(() => {
        virusService.getAllViruses().then(res => {
            setViruses(res);
        });
    }, []);


    return <Fragment>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Magnitude</th>
                    <th>Released On</th>
                </tr>
            </thead>
            <tbody>
                <Virus viruses={viruses}></Virus>
            </tbody>
        </Table>
    </Fragment>
};

export default AllViruses;