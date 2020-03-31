import React from 'react';
import './App.css';
import Navigation from "../Navigation/Navigation";
import Aside from "../Aside/Aside";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

function App() {
  return (
    <div className="App">
      <Navigation />
      <div className="Container">
        <Aside />
        <Main />
      </div>
      <Footer />
    </div>
  );
}

export default App;
