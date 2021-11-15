import {combineReducers, createStore} from "redux";
import {trafficReducer} from "store/reducers/traffc-reducer";
import {composeWithDevTools} from "redux-devtools-extension";

const reducers = combineReducers({
  traffic: trafficReducer,
})

export const store = createStore(reducers, composeWithDevTools())

