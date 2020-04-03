import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import './App.css';
import Navigation from "../Navigation/Navigation";
import Aside from "../Aside/Aside";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Posts from "../Main/Post/Posts/Posts"
import CreatePost from "../Main/Post/CreatePost/CreatePost";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <div className="Container">
          <Aside />
          <Main>
            <Switch>
              <Route path="/" exact component={Posts} />
              <Route path="/posts/create" exact component={CreatePost} />
              <Route path="/users/register" exact component={Register} />
              <Route path="/users/login" exact component={Login} />
              <Route path="/users/profile" exact component={Profile} />
              <Route path="*" component={NotFound} />
            </Switch>
          </Main>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
