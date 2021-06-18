import axios from "axios";

import {FACEBOOK_LOGIN_REQUEST, FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL, FACEBOOK_LOGOUT,
  FACEBOOK_REGISTER_REQUEST,
  FACEBOOK_REGISTER_SUCCESS,
  FACEBOOK_REGISTER_FAIL} from "./types";

export const signin=(email, password)=>async (dispatch)=>{
  dispatch({
    type: FACEBOOK_LOGIN_REQUEST,
    payload: {
      email,
      password
    }
  });
  try{
      const {data}=await axios.post("/auth/login", {email, password});
      dispatch({
        type: FACEBOOK_LOGIN_SUCCESS,
        payload: data.user
      });
      localStorage.setItem("userInfo", JSON.stringify(data.user));
  } catch(error){
      dispatch({
        type: FACEBOOK_LOGIN_FAIL,
        payload: error.response && error.response.data.error ? error.response.data.error : error.message
      });
  }
}

export const register=(username, email, password)=>async (dispatch)=>{
  dispatch({
    type: FACEBOOK_REGISTER_REQUEST,
    payload: {
      username,
      email,
      password
    }
  });
  try{
      const {data}=await axios.post("/auth/register", {username, email, password});
      dispatch({
        type: FACEBOOK_REGISTER_SUCCESS,
        payload: data.user
      });
      localStorage.setItem("userInfo", JSON.stringify(data.user));
  } catch(error){
      dispatch({
        type: FACEBOOK_REGISTER_FAIL,
        payload: error.response && error.response.data.error ? error.response.data.error : error.message
      });
  }
}

export const signout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: FACEBOOK_LOGOUT });
  // document.location.href = '/signin';
};

