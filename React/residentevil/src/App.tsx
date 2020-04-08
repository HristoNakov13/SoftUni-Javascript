import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Jumbotron from "./components/Layout/Jumbotron";
import LOL from "./components/wtf";
import Navigation from "./components/Navigation/Navigation";
import AllViruses from "./components/ShowViruses/AllViruses";

function App() {
  return (
    <Fragment>
      <Router>
        <Layout>
          <Navigation />
          <Jumbotron>
            <Switch>
              {/* <Route path="/" component={LOL} /> */}
              <Route path="/viruses/all" component={AllViruses} />
            </Switch>
          </Jumbotron>
        </Layout>
      </Router>
    </Fragment>
  );
}

export default App;
