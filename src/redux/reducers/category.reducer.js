import { categoryConstants } from "../actions/constants";

export default function categoryReducer(
  state = { categories: [], loading: false, error: null },
  action
) {
  switch (action.type) {
    case categoryConstants.GET_ALL_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload.categories,
      };
    case categoryConstants.GET_ALL_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
