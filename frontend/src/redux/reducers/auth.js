import {
  FACEBOOK_LOGIN_REQUEST,
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  FACEBOOK_LOGOUT,
  FACEBOOK_REGISTER_REQUEST,
  FACEBOOK_REGISTER_SUCCESS,
  FACEBOOK_REGISTER_FAIL
} from "../actions/types";

export const authReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case FACEBOOK_LOGIN_REQUEST:
    case FACEBOOK_REGISTER_REQUEST:
      return {
        loading: true,
      };
    case FACEBOOK_LOGIN_SUCCESS:
    case FACEBOOK_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: payload,
      };
    case FACEBOOK_LOGIN_FAIL:
    case FACEBOOK_REGISTER_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case FACEBOOK_LOGOUT:
      return {};
    default:
      return state;
  }
};
