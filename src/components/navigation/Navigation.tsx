import React from 'react';
import {Link} from "react-router-dom";
import {useState} from "react";
import './styles.less';
import {IoMdClose, IoMdMenu, IoMdHome, IoMdSettings, IoMdPerson } from "react-icons/io";

const Navigation = () => {
    const [openMenu, setOpenMenu] = useState(true);
    return (
        <nav className={openMenu ? '' : 'closed'}>
            <button className='burger' onClick={() => setOpenMenu(!openMenu)}>
                <IoMdMenu className='icon icon-open' size={32}/>
                <IoMdClose  className='icon icon-close' size={32}/>
            </button>
            <div className="nav-content">
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