import React from 'react';
import { createRoot } from 'react-dom/client';
import {Provider} from "react-redux";
import {store} from './redux';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "./components/pages/Homepage/Homepage";
import Settings from "./components/pages/Settings/settings";
import NotFound from "./components/pages/NotFound";
import Navigation from "./components/navigation/Navigation";
import Profile from "./components/pages/Profile/Profile";

import { Button } from 'react-bootstrap';
import './styles.less';

const root = createRoot(document.getElementById('root'));
root.render(
        <Router>

            <Provider store={store}>
                <Navigation/>
                <div className="content">
                    <Routes>
                        <Route index element={<HomePage/>}/>
                        <Route path='/profile' element={<Profile />} />
                        <Route path='/settings' element={<Settings />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </Provider>
        </Router>
);

