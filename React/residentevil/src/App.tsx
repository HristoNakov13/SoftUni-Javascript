import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Jumbotron from "./components/Layout/Jumbotron";
import Navigation from "./components/Navigation/Navigation";
import AllViruses from "./components/ShowViruses/AllViruses";
import AddVirus from "./components/AddVirus/AddVirus";
import VirusDetails from "./components/VirusDetails/VirusDetails";
import EditVirus from "./components/EditVirus/EditVirus";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import UserContextProvider from "./contexts/user/UserContext";

function App() {
    return (
        <Fragment>
            <UserContextProvider>
                <Router>
                    <Layout>
                        <Navigation />
                        <Jumbotron>
                            <Switch>
                                <Route path={"/"} exact component={Home} />
                                <Route path="/viruses/all" exact component={AllViruses} />
                                <Route path="/viruses/add" exact component={AddVirus} />
                                <Route path="/viruses/edit/:id" exact component={EditVirus} />
                                <Route path="/viruses/:id" component={VirusDetails} />
                                <Route path="/register" exact component={Register} />
                                <Route path="/login" exact component={Login} />
                            </Switch>
                        </Jumbotron>
                    </Layout>
                </Router>
            </UserContextProvider>
        </Fragment>
    );
}

export default App;
