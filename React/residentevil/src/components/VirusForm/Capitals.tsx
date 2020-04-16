import React, { Fragment } from "react";

interface Capital {
    id: string,
    name: string,
}

interface Props {
    capitals: Capital[],
    selected: string[]
}

const Capitals: React.FC<Props> = ({ capitals, selected }) => {
    return <Fragment>
        {capitals && capitals.map(capital => {
            return <option key={capital.id} value={capital.id} selected={selected.includes(capital.id)}>
                {capital.name}
            </option>
        })}
    </Fragment>;
};

export default Capitals;