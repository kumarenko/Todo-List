import React from 'react';
import {useSelector} from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './../components/pages/Homepage/Homepage';
import Settings from './../components/pages/Settings/settings';
import NotFound from './../components/pages/NotFound';
import Navigation from './../components/navigation/Navigation';
import Profile from './../components/pages/Profile/Profile';
import LoginPage from "./pages/Login/Login";
import './../styles.less';

const App = () => {
    const theme = useSelector(state => state.settings.theme);
    const isAuthorized = useSelector(state => state.user.isAuthorized);
    return (
        <Router>
            {isAuthorized ? <Navigation/>: null}
            <div className={`content ${theme}`}>
                <Routes>
                    <Route index element={isAuthorized ? <HomePage /> : <Navigate to={'/login'} replace/>} />
                    <Route path='/profile' element={isAuthorized ? <Profile /> : <Navigate to={'/login'}/>} />
                    <Route path='/settings' element={isAuthorized ? <Settings /> : <Navigate to={'/login'}/>} />
                    <Route path='/login' element={<LoginPage/>} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
