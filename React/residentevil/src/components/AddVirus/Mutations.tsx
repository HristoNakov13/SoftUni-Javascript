import React, { Fragment } from "react";
import Form from "react-bootstrap/Form";

interface Props {
    mutations: string[]
}

const Mutations: React.FC<Props> = ({ mutations }) => {
    return <Fragment>
        {mutations && mutations.map((mutation, index) => {
            return <Form.Check key={index} type="radio"
                label={mutation}
                name="mutations"
                value={mutation}
                id={mutation}
            />
        })}
    </Fragment>
};

export default Mutations;