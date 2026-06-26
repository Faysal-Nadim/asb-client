import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import authReducer from "./reducers/auth.reducer";
import categoryReducer from "./reducers/category.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
