import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import { GoogleLogin } from '@react-oauth/google';
import {useDispatch, useSelector} from "react-redux";
import {updateLogin} from "../../../redux/userReducer";
import ForgotPasswordModal from "./forgotPassword/forgotPasswordModal";
import {t} from "i18next";
import {getCountryCodeByIP} from "../../../helpers/helper";
import PasswordInput from "../../../common/passwordInput";
import ServerConfig from "../../../configs/serverConfig";

const SignInTab = ({ email, setEmail, setPassword, password, signInHandler, loginAsGuest, errors, resetErrors }) => {
    const dispatch = useDispatch();
    const userState = useSelector(state => state.user);
    const currentLanguage = useSelector(state => state.settings.language);
    const [triggerPassword, setTriggerPassword] = useState(false);
    const handleGoogleLoginSuccess = async (response) => {
        const idToken = response.credential;
        const accessToken = response.access_token;
        dispatch(updateLogin({...userState, loading: true}));

        try {
            const serverResponse = await fetch(`${ServerConfig.getUrl()}api/google-login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idToken, accessToken }),
            });

            if (serverResponse.ok) {
                const { token, user } = await serverResponse.json();
                sessionStorage.setItem('token', token);
                const country = await getCountryCodeByIP();
                const updatedLoginState = {
                    isAuthorized: true,
                    loading: false,
                    user: {
                        role: 'USER',
                        id: user._id,
                        email: user.email,
                        name: user.name,
                        lastName: user.lastName,
                        avatar: user.avatar,
                        googleId: user.googleId,
                        allowEmails: user.allowEmails,
                        country
                    },
                }
                dispatch(updateLogin(updatedLoginState));
            } else {
                console.error('Login failed:', await serverResponse.text());
                dispatch(updateLogin({...userState, loading: true}));
            }
        } catch (error) {
            console.error('Error during Google login:', error);
        }
    };

    return (
        <Form className='d-flex flex-column'>
            <Form.Group className="mb-2">
                <Form.Label className='subtitle'>{t('Email')}</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    isInvalid={!!errors?.email}
                    onChange={event => {
                        resetErrors();
                        setEmail(event.target.value)
                    }}
                    placeholder="name@example.com"
                />
                <Form.Control.Feedback type="invalid">
                    {errors?.email}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-2 d-flex flex-column" controlId="passLogin">
                <Form.Label className='subtitle'>{t('Password')}</Form.Label>
                <PasswordInput
                    value={password}
                    isInvalid={!!errors.password}
                    validationErrorsMessage={errors?.password}
                    onChange={event => {
                        resetErrors();
                        setPassword(event.target.value);
                    }}
                />
                <Button className='btn-link p-1 bg-transparent d-flex align-self-end' onClick={() => setTriggerPassword(true)}>
                    {t('Forgot password')}
                </Button>
            </Form.Group>
            <Button
                onClick={signInHandler}
                className='my-2 mx-auto mt-0'
            >{t('Login')}</Button>
            <div className='text-center subtitle'>{t('Or')}</div>
            <Button
                className='my-2 mx-auto'
                onClick={loginAsGuest}
            >{t('Continue as guest')}</Button>
            <div className='d-flex justify-content-center mt-2'>
                <GoogleLogin
                    theme={'filled_black'}
                    locale={currentLanguage}
                    onSuccess={handleGoogleLoginSuccess}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            </div>
            <ForgotPasswordModal
                show={triggerPassword}
                onHide={() => setTriggerPassword(false)}
            />
        </Form>
    );
}

export default React.memo(SignInTab);
