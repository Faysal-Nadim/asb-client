import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import authReducer from "./reducers/auth.reducer";
import categoryReducer from "./reducers/category.reducer";
import productReducer from "./reducers/product.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
