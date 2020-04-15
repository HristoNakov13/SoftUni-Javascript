import React, { Fragment } from "react";

interface Props {
    magnitudes: string[]
}

const Magnitudes: React.FC<Props> = ({ magnitudes }) => {

    return <Fragment>
        {magnitudes && magnitudes.map(magnitude => {
            return <option key={magnitude} value={magnitude}>
                {magnitude}
            </option>
        })
        }
    </Fragment>
}

export default Magnitudes;