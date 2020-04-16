import React, { Fragment } from "react";
import Form from "react-bootstrap/Form";

interface Props {
    mutations: string[],
    selected: string
}

const Mutations: React.FC<Props> = ({ mutations, selected }) => {
    return <Fragment>
        {mutations && mutations.map((mutation, index) => {
            return <Form.Check key={index} type="radio"
                label={mutation}
                name="mutation"
                value={mutation}
                id={mutation}
                checked={mutation === selected}
            />
        })}
    </Fragment>
};

export default Mutations;