import { productConstants } from "../actions/constants";

const initState = {
  product: {},
  productList: [],
  loading: false,
  error: null,
};

export default function productReducer(state = initState, action) {
  switch (action.type) {
    case productConstants.GET_PRODUCT_BY_SLUG_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case productConstants.GET_PRODUCT_BY_SLUG_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload.product,
      };
    case productConstants.GET_PRODUCT_BY_SLUG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case productConstants.SEARCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case productConstants.SEARCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        productList: action.payload.results,
      };
    case productConstants.SEARCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case productConstants.IMAGE_SEARCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case productConstants.IMAGE_SEARCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        productList: action.payload.results,
      };
    case productConstants.IMAGE_SEARCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
