import React, { Fragment, useState, useEffect } from "react";

import virusService from "../../services/virus-service";
import VirusDetailsInterface from "../VirusDetails/virus-details-interface";
import VirusForm from "../VirusForm/VirusForm";

//TODO fix interface mash fuck up


const EditVirus: React.FC = (props: any) => {
    const defaultState: any = {
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
        capitals: []
    };

    const [initialState, setInitialState] = useState(defaultState);

    useEffect(() => {
        const virusId = props.match.params.id;
        virusService.getVirusById(virusId)
            .then(res => {
                setInitialState(res);
            });
    }, [props.match.params.id])

    const submitFunc = (virus: VirusDetailsInterface): Promise<any> => {
        return virusService.editVirus(virus);
    };

    return (
        <Fragment>
            <VirusForm initialState={initialState} submitFunc={submitFunc} />
        </Fragment>
    )
}

export default EditVirus;