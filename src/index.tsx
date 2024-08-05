import React from 'react';
import {store} from './redux';
import {createRoot} from 'react-dom/client';
import {GoogleOAuthProvider} from "@react-oauth/google";
import {Provider} from "react-redux";

import App from "./components/App";
import './styles.less';

const root = createRoot(document.getElementById('root'));
root.render(<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
    <Provider store={store}>
        <App/>
    </Provider>
</GoogleOAuthProvider>);

