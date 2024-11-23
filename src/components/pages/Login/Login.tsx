import React, { useEffect, useState } from 'react';
import {Alert, Button, Tab, Tabs} from "react-bootstrap";
import {connect, useDispatch, useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';
import { setUserData, signInAction, signUpAction } from "../../../actions/login";
import SignInTab from './SignInTab';
import SignUpTab from './SignUpTab';
import {validateSignInForm, validateSignUpForm} from "../../../helpers/validator";
import {updateLogin} from "../../../redux/userReducer";
import Spinner from "../../../common/spinner";
import {t} from "i18next";
import {IoMdSettings} from "react-icons/io";
import SettingsModal from "./settingsModal";

const LoginPage = ({ user, setUserData, signInAction, signUpAction, title }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useSelector(state => state.settings.theme);
    const buttonsVariant = theme === 'light' ? 'primary' : 'dark';
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState([]);
    const [key, setKey] = useState('login');
    const [errors, setErrors] = useState({});


    useEffect(() => {
        document.title = title;
    }, [title]);

    useEffect(() => {
        if (user.isAuthorized) {
            navigate(-1);
        } else if (user.errorMessage) {
            setErrorMessage(user.errorMessage);
            setShowErrorPopup(true);
        } else if (user.successMessage) {
            setKey('login');
            setSuccessMessage(user.successMessage);
            setShowSuccessPopup(true);
        }
    }, [user, navigate]);

    const signUpHandler = () => {
        setErrors(validateSignUpForm({ email, password, confirmPassword, name }));
        if (!Object.keys(validateSignUpForm({ email, password, confirmPassword, name })).length) {
            signUpAction(email,name, password);
        }
    }

    const signInHandler = () => {
        setErrors(validateSignInForm({ email, password }));
        // setErrorMessage(errors);
        if (Object.keys(validateSignInForm({ email, password })).length) {
            // setShowPopup(true);

        } else {
            signInAction({ email, password });
        }
    }

    const loginAsGuest = () => {
        setUserData(!user.isAuthorized);
    }

    const reset = () => setErrors({});
    if (!user.isAuthorized) {
        return (
            <div className='login container-sm my-auto h-100 d-flex align-items-start justify-content-center pt-5'>
                {user.loading ? <Spinner/> : null}
                <div className="login-content d-flex flex-column align-items-stretch justify-content-center position-relative">
                    <Button className={'position-absolute end-0 d-flex align-items-center justify-content-center bg-transparent'}
                            style={{top: '-10%'}}
                            onClick={() => setShowSettingsModal(true)}>
                        <IoMdSettings className="fs-4 me-2"/>
                    </Button>
                    <SettingsModal show={showSettingsModal} onHide={() => setShowSettingsModal(false)}/>
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => {
                            setKey(k);
                            reset();
                        }}
                        className="mb-3 w-100"
                    >
                        <Tab eventKey={"login"} title={t("Login")}>
                            {key === 'login' && <SignInTab
                                email={email} setEmail={setEmail}
                                password={password} setPassword={setPassword}
                                signInHandler={signInHandler}
                                loginAsGuest={loginAsGuest}
                                buttonsVariant={buttonsVariant}
                                errors={errors}
                                resetErrors={reset}
                            />}
                        </Tab>
                        <Tab eventKey={"register"} title={t("Sign Up")}>
                            {key === 'register' && <SignUpTab
                                email={email} setEmail={setEmail}
                                name={name} setName={setName}
                                password={password} setPassword={setPassword}
                                confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
                                signUpHandler={signUpHandler}
                                buttonsVariant={buttonsVariant}
                                errors={errors}
                                resetErrors={reset}
                            />}
                        </Tab>
                    </Tabs>
                </div>
                {showErrorPopup ? <Alert onAnimationEnd={() => {
                    setShowErrorPopup(false);
                    dispatch(updateLogin({...user, errorMessage: ''}));
                    setErrorMessage('');
                }} variant='danger' className='popup position-fixed'>
                    {errorMessage}
                </Alert> : null}
                {showSuccessPopup ? <Alert onAnimationEnd={() => {
                    setShowSuccessPopup(false);
                    dispatch(updateLogin({...user, successMessage: ''}))
                }} variant='success' className='popup position-fixed'>
                    {t(successMessage)}
                </Alert> : null}
            </div>
        );
    }
    return null;
};

const mapStateToProps = (state) => ({
    user: state.user
});

const mapDispatchToProps = {
    setUserData,
    signInAction,
    signUpAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
