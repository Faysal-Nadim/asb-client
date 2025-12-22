import axiosInstance from "../helpers/axios";
import { shopConstants } from "./constants";

export const createShop = (data) => {
  return async (dispatch) => {
    dispatch({ type: shopConstants.CREATE_SHOP_REQUEST });
    try {
      const res = await axiosInstance.post("/shop/create-new", data);
      dispatch({
        type: shopConstants.CREATE_SHOP_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: shopConstants.CREATE_SHOP_FAILURE,
        payload: error.response
          ? error.response.data
          : { error: "Network Error" },
      });
    }
  };
};
