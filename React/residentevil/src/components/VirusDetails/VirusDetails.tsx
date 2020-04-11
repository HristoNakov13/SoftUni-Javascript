import React, { Fragment, useState, useEffect } from "react";

import virusService from "../../services/virus-service";
import Virus from "../AddVirus/virus-interface";

const VirusDetails: React.FC = (props: any) => {
    const [virus, setVirus] = useState<Virus>();

    useEffect(() => {
        const virusId = props.match.params.id;

        virusService.getVirusById(virusId)
            .then((res: Virus) => {
                setVirus(res);
            });
    }, []);

    console.log(virus);

    return <Fragment>
        <h1>{virus?.magnitude}</h1>
        <h1>{virus?.name}</h1>
    </Fragment>
}


export default VirusDetails;