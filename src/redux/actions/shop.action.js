import { errorToast, successToast } from "../../utils/toast";
import axiosInstance from "../helpers/axios";
import { shopConstants } from "./constants";

export const createShop = (data) => {
  return async (dispatch) => {
    dispatch({ type: shopConstants.CREATE_SHOP_REQUEST });
    try {
      const res = await axiosInstance.post("/shop/create-new", data);
      dispatch({
        type: shopConstants.CREATE_SHOP_SUCCESS,
        payload: res.data.shop,
      });
      successToast(res.data.msg);
    } catch (error) {
      dispatch({
        type: shopConstants.CREATE_SHOP_FAILURE,
        payload: error.response
          ? error.response.data
          : { error: "Network Error" },
      });
      errorToast(error.response ? error.response.data.msg : "Network Error");
    }
  };
};

export const getBasicShopDetails = () => {
  return async (dispatch) => {
    dispatch({ type: shopConstants.GET_BASIC_SHOP_DETAILS_REQUEST });
    try {
      const res = await axiosInstance.get("/shop/services/basic-details");
      const { shop } = res.data;
      localStorage.setItem("shop", JSON.stringify(shop));
      dispatch({
        type: shopConstants.GET_BASIC_SHOP_DETAILS_SUCCESS,
        payload: shop,
      });
    } catch (error) {
      dispatch({
        type: shopConstants.GET_BASIC_SHOP_DETAILS_FAILURE,
        payload: error.response
          ? error.response.data
          : { error: "Network Error" },
      });
    }
  };
};

export const getShopSettings = () => {
  return async (dispatch) => {
    dispatch({ type: shopConstants.GET_SHOP_SETTINGS_REQUEST });
    try {
      const res = await axiosInstance.get("/shop/services/get-settings");
      const { shop } = res.data;
      dispatch({
        type: shopConstants.GET_SHOP_SETTINGS_SUCCESS,
        payload: shop,
      });
    } catch (error) {
      dispatch({
        type: shopConstants.GET_SHOP_SETTINGS_FAILURE,
        payload: error.response
          ? error.response.data
          : { error: "Network Error" },
      });
      errorToast(error.response ? error.response.data.msg : "Network Error");
    }
  };
};
