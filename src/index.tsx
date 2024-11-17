import React from 'react';
import {createRoot} from 'react-dom/client';
import {GoogleOAuthProvider} from "@react-oauth/google";
import {Provider} from "react-redux";
import { store, persistor } from './redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from "./components/App";
import './styles.less';

const root = createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </GoogleOAuthProvider>
);