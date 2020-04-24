import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import AllViruses from "../ShowViruses/AllViruses";
import AddVirus from "../AddVirus/AddVirus";
import VirusDetails from "../VirusDetails/VirusDetails";
import EditVirus from "../EditVirus/EditVirus";
import Home from "../Home/Home";
import Register from "../Register/Register";
import Login from "../Login/Login";

import PrivateRoute from "./PrivateRoute";

interface Props {
    isLoggedIn: boolean;
};

const Routes: React.FC<Props> = ({ isLoggedIn, ...props }) => {
    return (
        <Fragment>
            <Switch>
                <Route path={"/"} exact component={Home} />
                <Route path="/register" exact component={Register} />
                <Route path="/login" exact component={Login} />

                <PrivateRoute path={"/viruses/all"} isLoggedIn={isLoggedIn} component={AllViruses} />
                <PrivateRoute path={"/viruses/add"} isLoggedIn={isLoggedIn} component={AddVirus} />
                <PrivateRoute path={"/viruses/edit/:id"} isExactPath={false} isLoggedIn={isLoggedIn} component={EditVirus} />

                {/* <PrivateRoute path={"/viruses/details/:id"} isExactPath={false} isLoggedIn={isLoggedIn} component={VirusDetails} /> */}

                <Route path={"/viruses/details/:id"} component={VirusDetails} />
            </Switch>
        </Fragment>
    );
};

export default Routes;