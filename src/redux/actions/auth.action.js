import { errorToast, successToast } from "../../utils/toast";
import axiosInstance from "../helpers/axios";
import { authConstants } from "./constants";

export const userRegistrationWithEmail = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.USER_REGISTER_REQUEST });
    try {
      const res = await axiosInstance.post("/auth/user/register", user);
      if (res.status === 201) {
        const { msg, user, verification } = res.data;
        dispatch({
          type: authConstants.USER_REGISTER_SUCCESS,
          payload: { msg: msg, user: user, verification: verification },
        });
        successToast(msg);
        window.location.href =
          "/user/auth/verify-email?email=" + encodeURIComponent(user.email);
      }
    } catch (error) {
      errorToast(error?.response?.data?.msg || "Registration failed");
      dispatch({
        type: authConstants.USER_REGISTER_FAILURE,
        payload: { error: error?.response?.data },
      });
    }
  };
};

export const userLoginWithEmail = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.USER_LOGIN_REQUEST });
    try {
      const res = await axiosInstance.post("/auth/user/login", user);
      if (res.status === 200) {
        const { msg, user, token } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: authConstants.USER_LOGIN_SUCCESS,
          payload: { msg: msg, user: user, token: token },
        });
        successToast(msg);
      }
    } catch (error) {
      errorToast(error?.response?.data?.msg || "Login failed");
      dispatch({
        type: authConstants.USER_LOGIN_FAILURE,
        payload: { error: error?.response?.data },
      });

      if (error?.response?.status === 403) {
        window.location.href =
          "/user/auth/verify-email?email=" + encodeURIComponent(user.email);
      }
    }
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: authConstants.USER_LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: authConstants.USER_LOGIN_FAILURE,
        payload: { error: "Failed to login!" },
      });
    }
  };
};

export const sendOtp = (email) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.OTP_SEND_REQUEST });
    try {
      const res = await axiosInstance.post("/auth/user/verification/send-otp", {
        email,
      });
      if (res.status === 200) {
        const { msg } = res.data;
        dispatch({
          type: authConstants.OTP_SEND_SUCCESS,
          payload: { msg: msg },
        });
        successToast(msg);
      }
    } catch (error) {
      errorToast(error?.response?.data?.msg || "Failed to send OTP");
      dispatch({
        type: authConstants.OTP_SEND_FAILURE,
        payload: { error: error?.response?.data },
      });
    }
  };
};

export const verifyUserEmail = (email, otp) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.EMAIL_VERIFICATION_REQUEST });
    try {
      const res = await axiosInstance.post(
        "/auth/user/verification/verify-otp",
        {
          email,
          otp,
        },
      );
      if (res.status === 200) {
        const { msg } = res.data;
        dispatch({
          type: authConstants.EMAIL_VERIFICATION_SUCCESS,
          payload: { msg: msg },
        });
        successToast(msg);
        window.location.href = "/user/auth";
      }
    } catch (error) {
      errorToast(error?.response?.data?.msg || "Email verification failed");
      dispatch({
        type: authConstants.EMAIL_VERIFICATION_FAILURE,
        payload: { error: error?.response?.data },
      });
    }
  };
};

export const userSignOut = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.USER_SIGNOUT_REQUEST });
    try {
      const res = await axiosInstance.get("/auth/user/signout");
      if (res.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({ type: authConstants.USER_SIGNOUT_SUCCESS });
      }
    } catch (error) {
      dispatch({
        type: authConstants.USER_SIGNOUT_FAILURE,
        payload: { error: error?.response?.data },
      });
    }
  };
};

export const getUserByToken = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.GET_USER_BY_TOKEN_REQUEST });
    try {
      const res = await axiosInstance.get("/user/services/get-user-by-token");
      if (res.status === 200) {
        const { user, msg } = res.data;
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: authConstants.GET_USER_BY_TOKEN_SUCCESS,
          payload: { user, msg },
        });
      } else {
        dispatch({
          type: authConstants.GET_USER_BY_TOKEN_FAILURE,
          payload: { error: "Failed to fetch user" },
        });
      }
    } catch (error) {
      dispatch({
        type: authConstants.GET_USER_BY_TOKEN_FAILURE,
        payload: { error: error?.response?.data },
      });
    }
  };
};

export const updateUserProfile = (userData) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.UPDATE_USER_PROFILE_REQUEST });
    try {
      const res = await axiosInstance.post(
        "/user/services/update-user-profile",
        userData,
      );
      if (res.status === 200) {
        const { msg } = res.data;
        dispatch({
          type: authConstants.UPDATE_USER_PROFILE_SUCCESS,
          payload: { msg },
        });
        dispatch(getUserByToken());
        successToast(msg);
      }
    } catch (error) {
      dispatch({
        type: authConstants.UPDATE_USER_PROFILE_FAILURE,
        payload: { error: error?.response?.data },
      });
    }
  };
};

export const changeUserPassword = (passwordData) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.PASSWORD_CHANGE_REQUEST });
    try {
      const res = await axiosInstance.post(
        "/user/services/change-password",
        passwordData,
      );
      if (res.status === 200) {
        const { msg } = res.data;
        dispatch({
          type: authConstants.PASSWORD_CHANGE_SUCCESS,
          payload: { msg },
        });
        successToast(msg);
      }
    } catch (error) {
      dispatch({
        type: authConstants.PASSWORD_CHANGE_FAILURE,
        payload: { error: error?.response?.data },
      });
      errorToast(error?.response?.data?.msg || "Password change failed");
    }
  };
};
