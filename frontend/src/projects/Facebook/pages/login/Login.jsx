import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import {Link} from "react-router-dom";
import {signin} from "../../../../redux/actions/auth";
import "./login.css";

import { CircularProgress } from "@material-ui/core";

const Login = ({history}) => {
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");

  const userSignin = useSelector((state) => state.authFacebook);
  const { userInfo, loading, error } = userSignin;

  useEffect(() => {
    if (userInfo) {
      history.push("/facebook");
    }
  }, [history, userInfo])

  const dispatch=useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social App</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Social App.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              className="loginInput"
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="loginInput"
              onChange={(e)=>setPassword(e.target.value)}
              required
              minLength="6"
            />
            <button className="loginButton" type="submit" >
                {loading ? (
                  <CircularProgress color="secondary" size="20px" />
                ) : (
                  "Log In"
                )}
            </button>
            {error && (
              <div className="danger_error">{error}</div>
            )}
            <span className="loginForgot">Forgot Password?</span>
            <Link to="/facebook/register" className="loginForgot">
              
                      Create a New Account
              
            </Link>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
