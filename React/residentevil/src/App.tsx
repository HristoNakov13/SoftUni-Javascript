import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Auth from "./components/Auth/Auth";

import UserContextProvider from "./contexts/user/UserContext";

function App() {
    return (
        <Fragment>
            <UserContextProvider>
                <Auth>
                    <BrowserRouter>
                        <Layout>
                        </Layout>
                    </BrowserRouter>
                </Auth>
            </UserContextProvider>
        </Fragment>
    );
}

export default App;
