import React, { Fragment } from "react";
import CapitalDetailsInterface from "./capital-details-interface";

interface Props {
    capitals: CapitalDetailsInterface[]
}

const Capitals: React.FC<Props> = ({ capitals }) => {

    return <Fragment>
        <ul>
            {capitals.map(capital => {
                return <Fragment>
                    <li>{capital.name}</li>
                    <li>{capital.longitude}</li>
                    <li>{capital.latitude}</li>
                </Fragment>
            })}
        </ul>
    </Fragment>
}

export default Capitals;