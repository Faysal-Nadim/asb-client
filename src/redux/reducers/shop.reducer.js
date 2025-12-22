import { shopConstants } from "../actions/constants";

const initState = {
  creatingShop: false,
  shopCreated: false,
  error: null,
};

export const shopReducer = (state = initState, action) => {
  switch (action.type) {
    case shopConstants.CREATE_SHOP_REQUEST:
      return {
        ...state,
        creatingShop: true,
        shopCreated: false,
      };
    case shopConstants.CREATE_SHOP_SUCCESS:
      return {
        ...state,
        creatingShop: false,
        shopCreated: true,
      };
    case shopConstants.CREATE_SHOP_FAILURE:
      return {
        ...state,
        creatingShop: false,
        shopCreated: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
