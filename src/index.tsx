import React from 'react';
import { createRoot } from 'react-dom/client';
import {Provider} from "react-redux";
import {store} from './redux';
import App from "./App";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Settings from "./components/pages/Settings/settings";
import NotFound from "./components/pages/NotFound";
import Navigation from "./components/navigation/Navigation";
const root = createRoot(document.getElementById('root'));

root.render(
        <Router>
            <Provider store={store}>
            <Navigation/>
                <Routes>
                    <Route index element={<App/>}/>
                    <Route path='/settings' element={<Settings />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Provider>
        </Router>
);

