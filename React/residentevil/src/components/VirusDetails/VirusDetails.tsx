import React, { Fragment, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

import Capitals from "./Capitals";

import virusService from "../../services/virus-service";
import VirusDetailsInterface from "./virus-details-interface";
import hasKey from "../../util/has-key";

const VirusDetails: React.FC = (props: any) => {
    const [virus, setVirus] = useState<VirusDetailsInterface>();

    useEffect(() => {
        const virusId = props.match.params.id;

        virusService.getVirusById(virusId)
            .then((res: VirusDetailsInterface) => {
                setVirus(res);
            })
            .catch(console.error);
    }, [props.match.params.id]);

    const [redirect, setRedirect] = useState("");

    const deleteVirus = () => {
        if (!virus) {
            return;
        }

        virusService.deleteVirus(virus.id)
            .then(() => {
                setRedirect("/viruses/all");
            })
            .catch(console.error);
    }

    if (redirect) {
        return <Redirect to={redirect} />
    }

    return <Fragment>
        <h1>Virus details:</h1>
        <ul>
            {virus && Object.keys(virus).map(key => {
                if (hasKey(virus, key)) {
                    return <li>{key !== "capitals"
                        ? `${key} - ${virus[key]}`
                        : <Capitals capitals={virus.capitals} />}</li>
                }
                return "";
            })}
        </ul>
        <Link to={`/viruses/edit/${virus && virus.id}`}>
            <Button variant="success">
                Edit
            </Button>
        </Link>

        <Button variant="danger" onClick={deleteVirus}>
            Delete
            </Button>
    </Fragment>
}

export default VirusDetails;