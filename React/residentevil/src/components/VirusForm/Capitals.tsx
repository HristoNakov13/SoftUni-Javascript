import React, { Fragment } from "react";

interface Capital {
    id: string,
    name: string,
}

interface Props {
    capitals: Capital[]
}

const Capitals: React.FC<Props> = ({ capitals }) => {
    return <Fragment>
        {capitals && capitals.map(capital => {
            return <option key={capital.id} value={capital.id}>
                {capital.name}
            </option>
        })}
    </Fragment>;
};

export default Capitals;