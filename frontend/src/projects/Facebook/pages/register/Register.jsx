import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {register} from "../../../../redux/actions/auth";
import { Link } from "react-router-dom";
import "./register.css";

import { CircularProgress } from "@material-ui/core";

const Register = ({history}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userSignin = useSelector((state) => state.authFacebook);
  const { userInfo, loading, error } = userSignin;

  useEffect(() => {
    if (userInfo) {
      history.push("/facebook");
    }
  }, [history, userInfo])

  const dispatch=useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Password and confirm password are not match');
    } else {
      dispatch(register(username, email, password));
    }
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
          <form className="loginBox" onSubmit={handleRegister}>
            <input
              placeholder="Username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              className="loginInput"
              required
            />
            <input
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="loginInput"
              required
            />
            <input
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="loginInput"
              minLength="6"
              required
            />
            <input
              placeholder="Password Again"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="loginInput"
              minLength="6"
              required
            />
            <button className="loginButton" type="submit">
              {loading ? (
                  <CircularProgress color="secondary" size="20px" />
                ) : (
                  "Sign Up"
                )}
            </button>
            {error && (
              <div className="danger_error">{error}</div>
            )}
            <Link to="/facebook/login" className="loginRegisterLink">
              Log into Account
            </Link>
          </form>
        
        </div>
      </div>
    </div>
  );
};

export default Register;
