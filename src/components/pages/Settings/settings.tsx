import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {changeTheme} from "../../../actions/settings";
import Form from "react-bootstrap/Form";
import {updateProfileInfo} from "../../../actions/login";

const Settings = ({theme, changeTheme, title, user, isMetricUnits,updateProfileInfo}) => {
    useEffect(() => {
        document.title = title;
    }, []);
    const toggle = () => {
        const newTheme = theme === 'light' ? 'dark': 'light';
        changeTheme(newTheme);
    }
    const toggleUnits = (event) => {
        updateProfileInfo(user.id, {metricUnits: event.target.value === 'metric'});
    }
    return (
        <div className='homepage d-flex flex-column align-items-center'>
            <div className="d-flex justify-content-between h3 w-75 p-3">
                <h1 className='title'>Settings</h1>
            </div>
            <div className="w-75 p-3">
                <h5 className='m-1 title'>Dark mode</h5>
                <Form.Check
                    type="switch"
                    defaultChecked={theme !== 'light'}
                    onChange={() => toggle()}
                    className='my-2'
                />
                <div>
                    <h5 className='m-1 title'>Select Units</h5>
                    <Form.Select aria-label="Units" value={isMetricUnits ? 'metric' : 'imperial'} onChange={toggleUnits} className='w-25'>
                        <option value="metric">Metric</option>
                        <option value="imperial">Imperial</option>
                    </Form.Select>
                </div>
                <div className="div">
                    <h5 className='m-1 title'>Select language</h5>
                    <Form.Select aria-label="language" defaultValue={'en'} className='w-25'>
                        <option value="en">English</option>
                        <option value="ua">Ukrainian</option>
                        <option value="pl">Polish</option>
                    </Form.Select>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    theme: state.settings.theme,
    isMetricUnits: state.settings.isMetric,
    user: state.user.user,
})

const mapDispatchToProps = {
    changeTheme,
    updateProfileInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);