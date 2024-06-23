import React, { useEffect, useState } from 'react';
import { Alert, Tab, Tabs } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { setUserData, signInAction, signUpAction } from "../../../actions/login";
import SignInTab from './SignInTab';
import SignUpTab from './SignUpTab';

import './styles.less';
import {validateSignInForm, validateSignUpForm} from "../../../helpers/validator";

const LoginPage = ({ user, setUserData, signInAction, signUpAction, title }) => {
    const theme = useSelector(state => state.settings.theme);
    const buttonsVariant = theme === 'light' ? 'primary' : 'dark';

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('123123123');
    const [confirmPassword, setConfirmPassword] = useState('123123123');

    const [showPopup, setShowPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState([]);
    const [key, setKey] = useState('login');
    const navigate = useNavigate();

    useEffect(() => {
        document.title = title;
    }, [title]);

    useEffect(() => {
        if (user.isAuthorized) {
            navigate(-1);
        } else if (user.errorMessage) {
            setErrorMessage([user.errorMessage]);
            setShowPopup(true);
        }
    }, [user, navigate]);

    const signUpHandler = (event) => {
        console.log('event, ', event);
        const errors = validateSignUpForm({ email, password, confirmPassword, name, lastName });
        setErrorMessage(errors);
        if (errors.length) {
            setShowPopup(true);
        } else {
            signUpAction(email, password);
        }
    }

    const signInHandler = () => {
        const errors = validateSignInForm({ email, password });
        setErrorMessage(errors);
        if (errors.length) {
            setShowPopup(true);
        } else {
            signInAction({ email, password });
        }
    }

    const loginAsGuest = () => {
        setUserData(!user.isAuthorized);
    }

    if (!user.isAuthorized) {
        return (
                <div className='login container-sm my-auto h-100 d-flex align-items-start justify-content-center'>
                <div className="login-content d-flex flex-column align-items-center justify-content-center">
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className="mb-3"
                    >
                        <Tab eventKey={"login"} title="Sign In">
                            <SignInTab
                                email={email} setEmail={setEmail}
                                password={password} setPassword={setPassword}
                                signInHandler={signInHandler}
                                loginAsGuest={loginAsGuest}
                                buttonsVariant={buttonsVariant}
                            />
                        </Tab>
                        <Tab eventKey={"register"} title="Sign Up">
                            <SignUpTab
                                email={email} setEmail={setEmail}
                                name={name} setName={setName}
                                lastName={lastName} setLastName={setLastName}
                                password={password} setPassword={setPassword}
                                confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
                                signUpHandler={signUpHandler}
                                buttonsVariant={buttonsVariant}
                            />
                        </Tab>
                    </Tabs>
                </div>
                {showPopup ? <Alert onAnimationEnd={() => setShowPopup(false)} variant='danger' className='popup'>
                    {errorMessage.map(message => <div key={message} className='text-center'>{message}</div>)}
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
