import React from 'react';
import {Link, useLocation} from "react-router-dom";
import {IoMdHome, IoMdSettings, IoMdPerson} from "react-icons/io";

import './styles.less';
import {t} from "i18next";
import brandLogo from './../../media/brand new.png';
import logo from './../../media/brand.png';
import appStore from './../../media/apple.png';
import playMarket from './../../media/google-play.png';
const Navigation = () => {
    const location = useLocation();

    const getActiveClass = (path) => {
        if (path === '/' && (location.pathname === '/' || location.pathname.startsWith('/lists'))) {
            return 'active';
        }
        return location.pathname === path ? 'active' : '';
    };
    return (
        <nav className={'col-auto col-md-3 col-xl-2 p-0'}>
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-3 min-vh-100 justify-content-between">
                <div>
                    <Link to={'/'} className='logo-link'>
                        <div className='d-flex flex-nowrap justify-content-center mb-2'>
                            <img src={brandLogo} alt={'BuyIt brand'} className='brand-with-icon d-none d-sm-inline'/>
                            <img src={logo} alt={'BuyIt brand'} className='brand d-inline d-sm-none'/>
                        </div>
                    </Link>
                    <ul className='list-unstyled'>
                        <li>
                            <Link
                                className={`d-flex align-items-center pb-3 mb-md-0 me-md-auto text-decoration-none ${getActiveClass('/')}`}
                                to={'/'}
                            >
                                <IoMdHome className="fs-4"/> <span className="ms-1 d-none d-sm-inline">{t('Lists')}</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`d-flex align-items-center pb-3 mb-md-0 me-md-auto text-decoration-none ${getActiveClass('/profile')}`}
                                to={'/profile'}
                            >
                                <IoMdPerson className="fs-4"/> <span className="ms-1 d-none d-sm-inline">{t('Profile')}</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`d-flex align-items-center pb-3 mb-md-0 me-md-auto text-decoration-none ${getActiveClass('/settings')}`}
                                to={'/settings'}
                            >
                                <IoMdSettings className="fs-4"/> <span className="ms-1 d-none d-sm-inline">{t('Settings')}</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className='nav-footer w-100 d-flex flex-column justify-content-center align-items-center'>
                    <Link to={'/'} className='px-2 my-1'>
                        <img src={appStore} alt="app-store"/>
                        <span className='w-100'>{t('Get it on')} <div className=''><strong>App Store</strong></div></span>
                    </Link>
                    <Link to={'/'} className='px-2 my-1 mb-2'>
                        <img src={playMarket} alt="app-store"/>
                        <span className='w-100'>{t('Download on the')} <div><strong>Google Play</strong></div></span>
                    </Link>
                </div>
            </div>

        </nav>
    );
};

export default Navigation;
