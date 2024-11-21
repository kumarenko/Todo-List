import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {changeLanguage, changeTheme} from "../../../actions/settings";
import Form from "react-bootstrap/Form";
import {updateProfileInfo} from "../../../actions/login";
import {t} from 'i18next';

const Settings = ({theme, changeTheme, title, user, isMetricUnits,updateProfileInfo,settings,changeLanguage}) => {
    // const { t } = useTranslation();

    useEffect(() => {
        document.title = title;
    }, []);
    const toggle = () => {
        console.log('dddd');
        const newTheme = theme === 'light' ? 'dark': 'light';
        changeTheme(newTheme);
    }
    const toggleUnits = (event) => {
        updateProfileInfo(user.id, {metricUnits: event.target.value === 'metric'});
    }
    const changeLang = (value) => {
        changeLanguage(value);
    }
    return (
        <div className='content d-flex flex-column align-items-center mx-auto my-0'>
            <div className="d-flex justify-content-between h3 w-100 p-3 align-items-center justify-content-between flex-column flex-sm-row">
                <h1 className='title'>{t('Settings')}</h1>
            </div>
            <div className="w-100 p-3">
                <h5 className='m-1 title'>{t('Appearance')}</h5>
                <div className="form-check">
                    <input className="form-check-input" onChange={toggle} type="radio" name="light" id="light" checked={theme === 'light'}/>
                        <label className="subtitle" htmlFor="light">
                            {t('light')}
                        </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" onChange={() =>toggle()} type="radio" name="dark" id="dark"
                           checked={theme === 'dark'}/>
                        <label className="subtitle" htmlFor="dark">
                            {t('dark')}
                        </label>
                </div>
                <div>
                    <h5 className='m-1 title'>{t('Select Units')}</h5>
                    <Form.Select aria-label="Units" value={isMetricUnits ? 'metric' : 'imperial'} onChange={toggleUnits} className='w-25'>
                        <option value="metric">{t('Metric')}</option>
                        <option value="imperial">{t('Imperial')}</option>
                    </Form.Select>
                </div>
                <div className="div">
                    <h5 className='m-1 title'>{t('Change language')}</h5>
                    <Form.Select aria-label="language" defaultValue={settings.language} onChange={(e) => changeLang(e.target.value)} className='w-25'>
                        <option value="en">English</option>
                        <option value="ua">Ukrainian</option>
                        <option value="fr">French</option>
                        <option value="ru">Russian</option>
                        <option value="de">German</option>
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
    settings: state.settings,
})

const mapDispatchToProps = {
    changeTheme,
    updateProfileInfo,
    changeLanguage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);