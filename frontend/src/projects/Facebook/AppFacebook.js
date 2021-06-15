import React from 'react';
import {Route, Switch} from "react-router-dom";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

import "./style.css";

const AppFacebook = () => {
    return (
        <>
            <Switch>
                <Route path="/facebook" exact component={Home} />
                <Route path="/facebook/profile/:username"  component={Profile} />
                <Route path="/facebook/login" exact component={Login} />
                <Route path="/facebook/register" exact component={Register} />
            </Switch>
        </>
        
    )
}

export default AppFacebook
