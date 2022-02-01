import { createStore,applyMiddleware, combineReducers, AnyAction, Reducer
  } from "redux";
import { reducer } from "./reducer";
import thunk from 'redux-thunk'
import { AppState } from "./app-state";

// export const store = createStore(reduce, new AppState());
const middleware = [thunk];

export const store = createStore(reducer,new AppState(),applyMiddleware(...middleware));
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


