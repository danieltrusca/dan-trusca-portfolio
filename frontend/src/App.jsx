import React from "react";
import {Route, Switch} from "react-router-dom";
import Home from "./pages/Home";

// projects
import AppFacebook from "./projects/Facebook/AppFacebook";


import "./App.scss";

const App=()=>{
    
    return (
        <>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/facebook" component={AppFacebook} />
            </Switch>
        </>
    )
}

export default App;