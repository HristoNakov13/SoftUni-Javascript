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

function App() {
  return (
    <Fragment>
      <Router>
        <Layout>
          <Navigation />
          <Jumbotron>
            <Switch>
              <Route path="/viruses/all" exact component={AllViruses} />
              <Route path="/viruses/add" exact component={AddVirus} />
              <Route path="/viruses/edit/:id" exact component={EditVirus} />
              <Route path="/viruses/:id" component={VirusDetails} />
            </Switch>
          </Jumbotron>
        </Layout>
      </Router>
    </Fragment>
  );
}

export default App;
