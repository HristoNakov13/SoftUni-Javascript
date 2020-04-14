import React, { Fragment } from "react";
import {Button} from "react-bootstrap";

interface VirusInterface {
    id: string,
    name: string,
    magnitude: string,
    releasedOn: string
};

interface VirusProps {
    viruses: VirusInterface[]
}

const Virus: React.FC<VirusProps> = ({ viruses }) => {
    return <Fragment>
        {viruses && viruses.map((virus, index) => {
            const { id, name, magnitude, releasedOn } = virus;

            return <tr key={id}>
                <td>{index + 1}</td>
                <td>{name}</td>
                <td>{magnitude}</td>
                <td>{releasedOn}</td>
                <td><a href={`/viruses/${id}`}><Button>Details</Button></a></td>
            </tr>
        })}
    </Fragment>
};

export default Virus;