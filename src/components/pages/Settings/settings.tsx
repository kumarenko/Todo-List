import React from 'react';
import {connect} from "react-redux";
import {changeTheme} from "../../../actions/settings";
import Form from "react-bootstrap/Form";

const Settings = ({theme, changeTheme}) => {
    const toggle = () => {
        const newTheme = theme === 'light' ? 'dark': 'light';
        changeTheme(newTheme);
    }
    return (
        <div className='homepage d-flex flex-column align-items-center'>
            <div className="d-flex justify-content-between h3 w-75 p-3">
                <h1>Settings</h1>
            </div>
            <div className="w-75 p-3">
                <Form.Check
                    type="switch"
                    defaultChecked={theme !== 'light'}
                    onChange={() => toggle()}
                    className='my-2'
                    label="Dark Mode"
                />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    theme: state.settings.theme
})

const mapDispatchToProps = {
    changeTheme,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);