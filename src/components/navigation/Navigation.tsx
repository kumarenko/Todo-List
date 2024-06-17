import React from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {useState} from "react";
import {IoMdClose, IoMdMenu, IoMdHome, IoMdSettings, IoMdPerson } from "react-icons/io";

import './styles.less';

const Navigation = () => {
    const [openMenu, setOpenMenu] = useState(true);
    const theme = useSelector((state) => state.settings.theme);
    return (
        <nav className={openMenu ? `${theme}` : `${theme} closed`}>

            <div className="nav-content">
                <button className='burger' onClick={() => setOpenMenu(!openMenu)}>
                    <IoMdMenu className='icon icon-open' size={32} color={theme === 'light' ? '#000' : '#fff'}/>
                    <IoMdClose  className='icon icon-close' size={32} color={theme === 'light' ? '#000' : '#fff'}/>
                </button>
                <ul>
                    <li><Link to={'/'}>{openMenu ? <>My shopping lists</> : <IoMdHome/>}</Link></li>
                    <li><Link to={'/profile'}>{openMenu ? <>Profile</> : <IoMdPerson/>}</Link></li>
                    <li><Link to={'/settings'}>{openMenu ? <>Settings</> : <IoMdSettings/>}</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;