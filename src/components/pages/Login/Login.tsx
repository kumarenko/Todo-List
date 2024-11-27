import React, { useEffect, useState } from 'react';
import {Alert, Button, Tab, Tabs} from "react-bootstrap";
import {connect, useDispatch} from "react-redux";
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
import './styles.less';

const LoginPage = ({ user, setUserData, signInAction, signUpAction, title }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
    const [loading, setLoading] = useState(false);

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

    const signUpHandler = async () => {
        setErrors(validateSignUpForm({ email, password, confirmPassword, name }));
        if (!Object.keys(validateSignUpForm({ email, password, confirmPassword, name })).length) {
            setLoading(true);
            await signUpAction(email,name, password);
            setLoading(false);
        }
    }

    const signInHandler = async () => {
        setErrors(validateSignInForm({ email, password }));
        // setErrorMessage(errors);
        if (Object.keys(validateSignInForm({ email, password })).length) {
        } else {
            setLoading(true);
            await signInAction({ email, password });
            setLoading(false);
        }
    }

    const loginAsGuest = () => {
        setUserData(true);
    }

    const reset = () => setErrors({});
    if (!user.isAuthorized) {
        return (
            <div className='login my-auto mx-auto h-100 d-flex align-items-start justify-content-center pt-5'>
                {loading ? <Spinner/> : null}
                <div className="login-content d-flex flex-column align-items-stretch justify-content-center position-relative px-2">
                    <SettingsModal show={showSettingsModal} onHide={() => setShowSettingsModal(false)}/>
                    <Tabs
                        activeKey={key}
                        onSelect={(k) => {
                            setKey(k);
                            reset();
                        }}
                        className="mb-3 w-100"
                    >

                        <Tab eventKey={"login"} title={t("Login")}>
                            {key === 'login' && <>
                                <Button className={'d-flex align-items-center justify-content-center align-self-end'}
                                        onClick={() => setShowSettingsModal(true)}>
                                    <IoMdSettings className="fs-4"/>
                                </Button>
                                <SignInTab
                                    email={email} setEmail={setEmail}
                                    password={password} setPassword={setPassword}
                                    signInHandler={signInHandler}
                                    loginAsGuest={loginAsGuest}
                                    errors={errors}
                                    resetErrors={reset}
                                />
                                </>}
                        </Tab>
                        <Tab eventKey={"register"} title={t("Sign Up")}>
                            {key === 'register' && <>
                                <Button className={'d-flex align-items-center justify-content-center align-self-end'}
                                        onClick={() => setShowSettingsModal(true)}>
                                    <IoMdSettings className="fs-4"/>
                                </Button>
                                <SignUpTab
                                    email={email} setEmail={setEmail}
                                    name={name} setName={setName}
                                    password={password} setPassword={setPassword}
                                    confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
                                    signUpHandler={signUpHandler}
                                    errors={errors}
                                    resetErrors={reset}
                                />
                                </>}
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
