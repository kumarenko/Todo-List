import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './../components/pages/Homepage/Homepage';
import Settings from './pages/Settings/settings';
import NotFound from './../components/pages/NotFound';
import Navigation from './../components/navigation/Navigation';
import Profile from './../components/pages/Profile/Profile';
import LoginPage from "./pages/Login/Login";
import ListPage from "./pages/Homepage/listPage/ListPage";
import { checkUserSession } from "../actions/login";
import './../styles.less';
import './../common/theme.less';
import i18n from "i18next";
import GlobalMessage from "../common/globalMessage";
import TermsOfUse from "./pages/TermsOfUse/termsOfUse";
import PrivacyPolicy from "./pages/PrivacyPolicy/privacyPolicy";
import FAQ from "./pages/FAQ/faq";
import Feedback from "./pages/Feedback/feedback";

const App = () => {
    const theme = useSelector(state => state.settings.theme); // Получение темы из Redux
    const isAuthorized = useSelector(state => state.user.isAuthorized);
    const settings = useSelector(state => state.settings);
    const dispatch = useDispatch();
    useEffect(() => {
        if (i18n.language !== settings.language) {
            i18n.changeLanguage(settings.language);
        }
    }, []);
    useEffect(() => {
        dispatch(checkUserSession());
        document.title = 'Home';
    }, []);

    useEffect(() => {
        document.body.classList.remove('light', 'dark'); // Удаляем старые классы
        document.body.classList.add(theme); // Добавляем класс для новой темы
    }, [theme]);

    return (
        <div className='d-flex flex-nowrap flex-column flex-sm-row h-100'>
            <Router>
                <Navigation/>
                <div className={'position-relative col vh-100 overflow-auto px-0'}>
                    <Routes>
                        <Route index element={isAuthorized ? <HomePage title="Home" /> : <Navigate to={'/login'} />} />
                        <Route path='/lists' element={isAuthorized ?  <HomePage title="Home" /> : <Navigate to={'/login'} />} />
                        <Route path='/profile' element={isAuthorized ? <Profile title='Profile' /> : <Navigate to={'/login'} />} />
                        <Route path='/settings' element={isAuthorized ? <Settings title='Settings' /> : <Navigate to={'/login'} />} />
                        <Route path='/lists/:listId' element={isAuthorized ? <ListPage title='List' /> : <Navigate to={'/login'} />} />
                        <Route path='/feedback' element={<Feedback />} />
                        <Route path='/termsOfUse' element={<TermsOfUse />} />
                        <Route path='/privacyPolicy' element={<PrivacyPolicy />} />
                        <Route path='/faq' element={<FAQ />} />
                        <Route path='/login' element={<LoginPage title='Login' />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </Router>
            <GlobalMessage/>
        </div>
    );
};

export default App;
