import React, { Fragment } from "react";

interface Props {
    magnitudes: string[],
    selected: string
}

const Magnitudes: React.FC<Props> = ({ magnitudes, selected }) => {

    return <Fragment>
        {magnitudes && magnitudes.map(magnitude => {
            return <option key={magnitude} value={magnitude} selected={magnitude === selected}>
                {magnitude}
            </option>
        })
        }
    </Fragment>
}

export default Magnitudes;