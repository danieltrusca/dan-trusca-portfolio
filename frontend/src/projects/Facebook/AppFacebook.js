import React from 'react';
// import {useSelector} from "react-redux";
import {Route, Switch} from "react-router-dom";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

import UserRoute from "./routes/UserRoute";


const AppFacebook = () => {
    // const user=useSelector((state)=>state.authFacebook);
    // const {userInfo}=user;
    return (
        <>
                <Switch>
                    <UserRoute path="/facebook" exact component={Home} />
                    <UserRoute path="/facebook/profile/:username"  component={Profile} />
                    <Route path="/facebook/login" exact component={Login} />
                    <Route path="/facebook/register" exact component={Register} />
                </Switch>
        </>
        
    )
}

export default AppFacebook
