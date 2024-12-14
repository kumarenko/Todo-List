import React from 'react';
import {Link} from "react-router-dom";
import appStore from "../media/apple.png";
import {t} from "i18next";
import playMarket from "../media/google-play.png";

const Footer = () => {
    return ( null
        // <div className='position-fixed bottom-0 start-0 d-sm-none d-flex nav-footer w-100 flex-row justify-content-around align-items-center section-styled-bg' style={{bottom: 10, left: 0}}>
        //     <Link to={'/'} className='px-2 my-1'>
        //         <img src={appStore} alt="app-store"/>
        //         <span className='w-100 text-white'>{t('Get it on')} <div className=''><strong>App Store</strong></div></span>
        //     </Link>
        //     <Link to={'/'} className='px-2 my-1'>
        //         <img src={playMarket} alt="app-store"/>
        //         <span className='w-100 text-white'>{t('Download on the')} <div><strong>Google Play</strong></div></span>
        //     </Link>
        // </div>
    );
};

export default Footer;