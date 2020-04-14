import React, { Fragment, useState, useEffect } from "react";

import Capitals from "./Capitals";

import virusService from "../../services/virus-service";
import VirusDetailsInterface from "./virus-details-interface";
import helper from "../../util/helper";


const VirusDetails: React.FC = (props: any) => {
    const [virus, setVirus] = useState<VirusDetailsInterface>();

    useEffect(() => {
        const virusId = props.match.params.id;

        virusService.getVirusById(virusId)
            .then((res: VirusDetailsInterface) => {
                setVirus(res);
            });
    }, []);

    return <Fragment>
        <h1>Virus details:</h1>
        <ul>
            {virus && Object.keys(virus).map(key => {
                if (helper.hasKey(virus, key)) {
                    return <li>{key !== "capitals"
                        ? `${key} - ${virus[key]}`
                        : <Capitals capitals={virus.capitals} />}</li>
                }
            })}
        </ul>
    </Fragment>
}


export default VirusDetails;