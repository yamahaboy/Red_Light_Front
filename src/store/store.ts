import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "../models/IReduxProps";
import InfringementsReducer from "./reducers/infringementsReducer/index"
const appReducer = combineReducers({
  infringementsReducer:InfringementsReducer
});
export const store = configureStore({
  reducer: appReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppStateType = ReturnType<typeof appReducer>;
export type AppDispatchType = ThunkDispatch<AppStateType, null, AnyAction>;

export const useAppDispatch: () => AppDispatchType = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;
