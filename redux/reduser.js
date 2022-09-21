import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// import reducer
import auth from "./auth";

const persistConfig = {
  key: "recipenation",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({ auth });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
