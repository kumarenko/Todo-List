import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {changeLanguage, changeTheme} from "../../../actions/settings";
import Form from "react-bootstrap/Form";
import {updateProfileInfo} from "../../../actions/login";
import {t} from 'i18next';
import Footer from "../../../common/footer";

const Settings = ({theme, changeTheme, title, user, isMetricUnits,updateProfileInfo,settings,changeLanguage, isLoginPage}) => {
    useEffect(() => {
        if(!isLoginPage) {
            document.title = title;
        }
    }, []);
    const toggle = () => {
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
        <div className={`content d-flex flex-column align-items-center mx-auto my-0 ${isLoginPage ? 'w-100' : ''}`}>
            {!isLoginPage && <div className={`d-flex justify-content-between h3 w-100 align-items-center justify-content-between flex-column flex-sm-row pt-5 pt-sm-3 px-3 mb-0`}>
                <h1 className='title pt-2'>{t('Settings')}</h1>
            </div>}
            <div className={`w-100 p-3 ${isLoginPage ? 'd-flex justify-content-between': ''}`}>
                <div>
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
                </div>
                {!isLoginPage && <div>
                    <h5 className='m-1 title'>{t('Select Units')}</h5>
                    <Form.Select className={isLoginPage? 'w-auto' : 'w-50'} aria-label="Units" value={isMetricUnits ? 'metric' : 'imperial'} onChange={toggleUnits}>
                        <option value="metric">{t('Metric')}</option>
                        <option value="imperial">{t('Imperial')}</option>
                    </Form.Select>
                </div>}
                <div className="div">
                    <h5 className='m-1 title'>{t('Change language')}</h5>
                    <Form.Select className={isLoginPage? 'w-auto' : 'w-50'} aria-label="language" defaultValue={settings.language} onChange={(e) => changeLang(e.target.value)}>
                        <option value="en">{t('English')}</option>
                        <option value="ua">{t('Ukrainian')}</option>
                        <option value="fr">{t('French')}</option>
                        <option value="ru">{t('Russian')}</option>
                        <option value="de">{t('German')}</option>
                    </Form.Select>
                </div>
            </div>
            {!isLoginPage && <Footer/>}
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