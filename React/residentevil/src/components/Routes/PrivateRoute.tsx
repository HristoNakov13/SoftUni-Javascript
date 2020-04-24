import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";

interface Props {
    isLoggedIn: boolean;
    isExactPath?: boolean
    path: string;
    component: React.FC;
}

const PrivateRoute: React.FC<Props> = ({ isLoggedIn, path, isExactPath = true, component, ...props }) => {
    console.log(path);
    return (
        <Fragment>
            {isLoggedIn
                ? <Route pat={path} exact={isExactPath} component={component} />
                : <Redirect to={"/login"} />
            }
        </Fragment>
    );
};

export default PrivateRoute;