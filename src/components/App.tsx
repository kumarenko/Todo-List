import React from 'react';
import {useSelector} from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './../components/pages/Homepage/Homepage';
import Settings from './../components/pages/Settings/settings';
import NotFound from './../components/pages/NotFound';
import Navigation from './../components/navigation/Navigation';
import Profile from './../components/pages/Profile/Profile';
import './../styles.less';

const App = () => {
    const theme = useSelector(state => state.settings.theme);
    return (
        <Router>
            <Navigation />
            <div className={`content ${theme}`}>
                <Routes>
                    <Route index element={<HomePage />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/settings' element={<Settings />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
