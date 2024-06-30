import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './../components/pages/Homepage/Homepage';
import Settings from './pages/Settings/settings';
import NotFound from './../components/pages/NotFound';
import Navigation from './../components/navigation/Navigation';
import Profile from './../components/pages/Profile/Profile';
import LoginPage from "./pages/Login/Login";
import './../styles.less';
import {checkUserSession} from "../actions/login";

const App = () => {
    const theme = useSelector(state => state.settings.theme);
    const isAuthorized = useSelector(state => state.user.isAuthorized);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(checkUserSession());
        document.title = 'Home';
    }, []);
    return (
        <Router>
            {isAuthorized ? <Navigation/>: null}
            <div className={`content ${theme}`}>
                <Routes>
                    <Route index element={isAuthorized ? <HomePage title="Home" /> : <Navigate to={'/login'}/>} />
                    <Route path='/profile' element={isAuthorized ? <Profile title='Profile' /> : <Navigate to={'/login'}/>} />
                    <Route path='/settings' element={isAuthorized ? <Settings title='Settings'/> : <Navigate to={'/login'}/>} />
                    <Route path='/login' element={<LoginPage title='Login'/>} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
