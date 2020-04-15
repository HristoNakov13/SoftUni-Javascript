import React, { Fragment } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

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
                <td>
                    <Link to={`/viruses/${id}`}>
                        <Button variant="primary">
                            Details
                        </Button>
                    </Link>
                </td>
            </tr>
        })}
    </Fragment>
};

export default Virus;