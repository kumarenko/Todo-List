import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import { GoogleLogin } from '@react-oauth/google';
import {useDispatch, useSelector} from "react-redux";
import {updateLogin} from "../../../redux/userReducer";
import {Link} from "react-router-dom";
import ConfirmEmail from "./forgotPassword/confirmEmail";
import ForgotPasswordModal from "./forgotPassword/forgotPasswordModal";

const SignInTab = ({ email, setEmail, setPassword, password, signInHandler, loginAsGuest, buttonsVariant, errors, resetErrors }) => {
    const dispatch = useDispatch();
    const userState = useSelector(state => state.user);
    const [triggerPassword, setTriggerPassword] = useState(false);
    const handleGoogleLoginSuccess = async (response) => {
        const idToken = response.credential;
        const accessToken = response.access_token; // Получите токен доступа здесь
        dispatch(updateLogin({...userState, loading: true}));

        try {
            const serverResponse = await fetch('http://localhost:4000/api/google-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idToken, accessToken }),
            });

            if (serverResponse.ok) {
                const { token, user } = await serverResponse.json();
                sessionStorage.setItem('token', token);
                const updatedLoginState = {
                    isAuthorized: true,
                    loading: false,
                    user: {
                        role: 'USER',
                        id: user._id,
                        email: user.email,
                        name: user.name,
                        lastName: user.lastName,
                        image: user.image,
                        googleId: user.googleId
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
            <h2>Please log in</h2>
            <Form.Group className="mb-2">
                <Form.Label className='subtitle'>Email address</Form.Label>
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
            <Form.Group className="mb-2" controlId="passLogin">
                <Form.Label className='subtitle'>Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    isInvalid={!!errors.password}
                    onChange={event => {
                        resetErrors();
                        setPassword(event.target.value);
                    }}
                    autoComplete={'passLogin'}
                />
                <Form.Control.Feedback type="invalid">
                    {errors?.password}
                </Form.Control.Feedback>
                <Button className='btn-link' onClick={() => setTriggerPassword(true)}>
                    Forgot password
                </Button>
            </Form.Group>
            <Button
                variant={buttonsVariant}
                onClick={signInHandler}
                className='w-50 my-2 mx-auto'
            >Sign In</Button>
            <div className='text-center subtitle'>Or</div>
            <Button
                variant={buttonsVariant}
                className='w-75 my-1 mx-auto'
                onClick={loginAsGuest}
            >Enter as a Guest</Button>
            <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
            <ForgotPasswordModal
                show={triggerPassword}
                onHide={() => setTriggerPassword(false)}
            />
        </Form>
    );
}

export default React.memo(SignInTab);
