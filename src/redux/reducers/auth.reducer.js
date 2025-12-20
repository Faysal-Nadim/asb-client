import { authConstants } from "../actions/constants";

const initState = {
  authenticate: false,
  authenticating: false,
  verification: {},
  user: null,
  token: null,
  error: null,
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case authConstants.USER_LOGIN_REQUEST:
      return {
        ...state,
        authenticating: true,
        authenticate: false,
        error: null,
      };
    case authConstants.USER_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
        authenticate: true,
        authenticating: false,
      };
    case authConstants.USER_LOGIN_FAILURE:
      return {
        ...initState,
        error: action.payload.error,
      };
    case authConstants.USER_REGISTER_REQUEST:
      return {
        ...state,
        error: null,
      };
    case authConstants.USER_REGISTER_SUCCESS:
      return {
        ...state,
        verification: action.payload.verification,
        user: action.payload.user,
        error: null,
      };
    case authConstants.USER_REGISTER_FAILURE:
      return {
        ...initState,
        error: action.payload.error,
      };
    case authConstants.USER_SIGNOUT_REQUEST:
      return {
        ...state,
        error: null,
      };
    case authConstants.USER_SIGNOUT_SUCCESS:
      return {
        ...initState,
      };
    case authConstants.USER_SIGNOUT_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case authConstants.GET_USER_BY_TOKEN_REQUEST:
      return {
        ...state,
      };
    case authConstants.GET_USER_BY_TOKEN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        authenticate: true,
        authenticating: false,
      };
    case authConstants.GET_USER_BY_TOKEN_FAILURE:
      return {
        ...state,
      };
    case authConstants.UPDATE_USER_PROFILE_REQUEST:
      return {
        ...state,
        error: null,
      };
    case authConstants.UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        error: null,
      };
    case authConstants.UPDATE_USER_PROFILE_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case authConstants.PASSWORD_CHANGE_REQUEST:
      return {
        ...state,
        error: null,
      };
    case authConstants.PASSWORD_CHANGE_SUCCESS:
      return {
        ...state,
        error: null,
      };
    case authConstants.PASSWORD_CHANGE_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
