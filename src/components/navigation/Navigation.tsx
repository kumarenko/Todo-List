import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import {IoMdHome, IoMdSettings, IoMdPerson} from "react-icons/io";

import './styles.less';
import {t} from "i18next";
import brandLogo from './../../media/brand new.png';
import appStore from './../../media/apple.png';
import playMarket from './../../media/google-play.png';
import { IoMdClose, IoMdMenu } from "react-icons/io";

import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {logoutAction} from "../../actions/login";
const Navigation = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const userRole = useSelector(state => state.user.user.role);
    const getActiveClass = (path) => {
        if (path === '/' && (location.pathname === '/' || location.pathname.startsWith('/lists'))) {
            return 'active';
        }
        return location.pathname === path ? 'active' : '';
    };
    useEffect(() => {
        setOpen(false);
    }, [location]);
    return (
        <nav className={`nav-container col-md-2 col-xl-2 p-0 ${open ? 'open' : 'close'}`}>
            <div className={`d-flex flex-sm-column flex-row align-items-sm-start pt-2 px-sm-3 px-2 justify-content-between `}>
                <Link to={'/'} className='logo-link d-flex align-items-center'>
                    <div className='d-flex flex-nowrap justify-content-sm-center justify-content-start m-sm-2 mb-0'>
                        <img src={brandLogo} alt={'BuyIt brand'} className='brand-with-icon'/>
                    </div>
                </Link>
                    <div className='d-flex mx-sm-auto mx-0'>
                        <Button
                            className='mx-2'
                            onClick={() => dispatch(logoutAction(userRole))}
                        >{t('Login')}</Button>
                        <Button onClick={() => {setOpen(!open)}} className='d-flex d-sm-none btn btn-primary align-items-center mx-2'>
                            {open ? <IoMdClose /> : <IoMdMenu/>}
                        </Button>
                    </div>
            </div>

            <ul className='list-unstyled'>
                <li>
                    <Link
                        className={`d-flex align-items-center mt-3 mb-md-0 mt-3 ms-sm-3 me-md-auto ms-md-3 text-decoration-none justify-content-sm-start justify-content-center ${getActiveClass('/')}`}
                        to={'/'}
                    >
                        <IoMdHome className="fs-4 me-2"/> <span>{t('Lists')}</span>
                    </Link>
                </li>
                <li>
                    <Link
                        className={`d-flex align-items-center mt-3 mb-md-0 mt-3  ms-sm-3 me-md-auto ms-md-3 text-decoration-none justify-content-sm-start justify-content-center  ${getActiveClass('/profile')}`}
                        to={'/profile'}
                    >
                        <IoMdPerson className="fs-4 me-2"/> <span>{t('Profile')}</span>
                    </Link>
                </li>
                <li>
                    <Link
                        className={`d-flex align-items-center mt-3 mb-md-0 mt-3 ms-sm-3 me-md-auto ms-md-3 text-decoration-none justify-content-sm-start justify-content-center ${getActiveClass('/settings')}`}
                        to={'/settings'}
                    >
                        <IoMdSettings className="fs-4 me-2"/> <span>{t('Settings')}</span>
                    </Link>
                </li>
            </ul>
            <div className='d-sm-flex d-none nav-footer w-100 flex-column justify-content-center align-items-start ps-3' style={{bottom: 10, left: 0}}>
                <Link to={'/'} className='px-2 my-1'>
                    <img src={appStore} alt="app-store"/>
                    <span className='w-100 text-white'>{t('Get it on')} <div className=''><strong>App Store</strong></div></span>
                </Link>
                <Link to={'/'} className='px-2 my-1 mb-2'>
                    <img src={playMarket} alt="app-store"/>
                    <span className='w-100 text-white'>{t('Download on the')} <div><strong>Google Play</strong></div></span>
                </Link>
            </div>
        </nav>
    );
};

export default Navigation;
