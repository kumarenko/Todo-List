import React from 'react';
import {Link} from "react-router-dom";

const Navigation = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li><Link to={'/'}>Home Page</Link></li>
                    <li><Link to={'/settings'}>Settings</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Navigation;