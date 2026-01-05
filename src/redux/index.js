import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import authReducer from "./reducers/auth.reducer";
import shopReducer from "./reducers/shop.reducer";

const rootReducer = combineReducers({ auth: authReducer, shop: shopReducer });

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
