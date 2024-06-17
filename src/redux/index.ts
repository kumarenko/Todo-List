import {combineReducers} from "redux";
import { applyMiddleware} from "redux";
import { legacy_createStore as createStore } from 'redux';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import todosReducer from "./shoppingListsReducer";
import settingsReducer from "./settingsReducer";

const rootReducer = combineReducers({
    items: todosReducer,
    settings: settingsReducer,
});

export const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));
