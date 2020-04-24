import React, { Fragment, useContext, useEffect } from "react";

import { UserContext } from "../../contexts/user/UserContext";

const Auth: React.FC = ({ children }) => {
    const { auth } = useContext(UserContext);

    useEffect(() => {
        auth();
    }, [])

    return (
        <Fragment>
            {children}
        </Fragment>
    );
};

export default Auth;