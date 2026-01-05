import { shopConstants } from "../actions/constants";

const initState = {
  creatingShop: false,
  shopCreated: false,
  error: null,
  loading: false,
  shopDetails: null,
};

export default function shopReducer(state = initState, action) {
  switch (action.type) {
    case shopConstants.CREATE_SHOP_REQUEST:
      return {
        ...state,
        creatingShop: true,
        shopCreated: false,
        loading: true,
      };
    case shopConstants.CREATE_SHOP_SUCCESS:
      return {
        ...state,
        creatingShop: false,
        shopCreated: true,
        loading: false,
        error: null,
      };
    case shopConstants.CREATE_SHOP_FAILURE:
      return {
        ...state,
        creatingShop: false,
        shopCreated: false,
        error: action.payload.error,
        loading: false,
      };
    case shopConstants.GET_BASIC_SHOP_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case shopConstants.GET_BASIC_SHOP_DETAILS_SUCCESS:
      return {
        ...state,
        shopDetails: action.payload,
        loading: false,
        error: null,
      };
    case shopConstants.GET_BASIC_SHOP_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
