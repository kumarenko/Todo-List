import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Использует localStorage для веба
import todosReducer, {defaultListsState} from './shoppingListsReducer';
import settingsReducer from './settingsReducer';
import userReducer, { defaultUserState } from './userReducer';

const appReducer = combineReducers({
    items: todosReducer,
    settings: settingsReducer,
    user: userReducer,
});

const persistConfig = {
    key: 'root',
    storage,
};

const LOGOUT = 'LOGOUT';

const rootReducer = (state, action) => {
    if (action.type === LOGOUT) {
        state = {
            items: defaultListsState,
            settings: state.settings,
            user: defaultUserState,
        };
    }
    return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            thunk: true,
            serializableCheck: false,
        }),
});

export const logout = () => ({
    type: LOGOUT,
});

const persistor = persistStore(store);

export { store, persistor };
