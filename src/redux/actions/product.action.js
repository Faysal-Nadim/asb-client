import { productConstants } from "../actions/constants";
import inventory from "../helpers/inventory";

export const searchProducts = (params) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.SEARCH_PRODUCTS_REQUEST });

    try {
      const res = await inventory.post(
        `/products/search?page=${params.page || 1}&page_size=${params.page_size || 20}&sort=${params.sort || "default"}`,
        { keyword: params.keyword },
      );

      if (res.status === 200) {
        const { results } = res.data;
        dispatch({
          type: productConstants.SEARCH_PRODUCTS_SUCCESS,
          payload: { results },
        });
      }
    } catch (error) {
      dispatch({
        type: productConstants.SEARCH_PRODUCTS_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const searchProductsByImage = (params) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.IMAGE_SEARCH_PRODUCTS_REQUEST });

    try {
      const res = await inventory.post(
        `/products/search/image?page=${params.page || 1}&page_size=${params.page_size || 20}&sort=${params.sort || "default"}`,
        { img_url: params.image },
      );

      if (res.status === 200) {
        const { results } = res.data;
        dispatch({
          type: productConstants.IMAGE_SEARCH_PRODUCTS_SUCCESS,
          payload: { results },
        });
      }
    } catch (error) {
      dispatch({
        type: productConstants.IMAGE_SEARCH_PRODUCTS_FAILURE,
        payload: error.message,
      });
    }
  };
};
