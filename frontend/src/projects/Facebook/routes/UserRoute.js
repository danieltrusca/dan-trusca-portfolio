import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";



const UserRoute = ({ children, ...rest }) => {
    const userSignin = useSelector((state) => state.authFacebook);
    const { userInfo } = userSignin;
    return userInfo && userInfo._id ? <Route {...rest} /> : (
        <Redirect to="/facebook/login" />
    );
};

export default UserRoute;

