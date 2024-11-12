import React from 'react';
import {Link} from "react-router-dom";
import {IoMdHome, IoMdSettings, IoMdPerson} from "react-icons/io";

import './styles.less';

const Navigation = () => {
    return (
        <nav className={'col-auto col-md-3 col-xl-2 px-sm-2 px-0'}>
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-3 min-vh-100">
                <ul className='list-unstyled'>
                    <li>
                        <Link className='d-flex align-items-center pb-3 mb-md-0 me-md-auto text-decoration-none' to={'/'}>
                            <IoMdHome className="fs-4"/> <span className="ms-1 d-none d-sm-inline">Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link className='d-flex align-items-center pb-3 mb-md-0 me-md-auto text-decoration-none' to={'/profile'}>
                            <IoMdPerson className="fs-4"/> <span className="ms-1 d-none d-sm-inline">Profile</span>

                        </Link>
                    </li>
                    <li>
                        <Link className='d-flex align-items-center pb-3 mb-md-0 me-md-auto text-decoration-none' to={'/settings'}>
                            <IoMdSettings className="fs-4"/> <span className="ms-1 d-none d-sm-inline">Settings</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;