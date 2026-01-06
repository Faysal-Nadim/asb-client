import axiosInstance from "../helpers/axios";
import { categoryConstants } from "./constants";

export const getAllCategories = () => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST });
    try {
      const res = await axiosInstance.get("/public/services/category/get-all");
      if (res.status === 200) {
        const { categories } = res.data;
        dispatch({
          type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
          payload: { categories },
        });
      } else {
        dispatch({
          type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
          payload: { error: res.data.error || "Failed to fetch categories" },
        });
      }
    } catch (error) {
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
        payload: { error: error.message || "Failed to fetch categories" },
      });
    }
  };
};
