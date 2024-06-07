import {combineReducers} from "redux";
import { applyMiddleware} from "redux";
import { legacy_createStore as createStore } from 'redux';
import {thunk} from 'redux-thunk';

import todosReducer from "./reducer";
import { composeWithDevTools } from '@redux-devtools/extension';

const rootReducer = combineReducers({
    items: todosReducer,
});

export const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));
