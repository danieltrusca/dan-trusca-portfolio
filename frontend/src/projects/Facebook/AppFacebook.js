import React from 'react';
import {Route, Switch} from "react-router-dom";
import Home from "./pages/home/Home";
import Topbar from "./components/topbar/Topbar";

// import "./style.css";

const AppFacebook = () => {
    return (
        <>
            <Topbar />
            <Switch>
                <Route path="/facebook" exact component={Home} />
            </Switch>
        </>
        
    )
}

export default AppFacebook
