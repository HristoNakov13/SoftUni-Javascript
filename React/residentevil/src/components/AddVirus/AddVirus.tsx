import React, { Fragment } from "react";

import VirusForm from "../VirusForm/VirusForm";
import VirusInterface from "../VirusForm/virus-interface";
import virusService from "../../services/virus-service";

const AddVirus: React.FC = () => {
    const initialState: VirusInterface = {
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

    const submitFunc = (virus: VirusInterface): Promise<any> => {
        return virusService.createVirus(virus);
    };

    return (
        <Fragment>
            <VirusForm initialState={initialState} submitFunc={submitFunc} />
        </Fragment>
    )
}

export default AddVirus;