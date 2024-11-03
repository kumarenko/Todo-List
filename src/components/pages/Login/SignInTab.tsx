import React from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import { GoogleLogin } from '@react-oauth/google';
import {useDispatch} from "react-redux";
import {updateLogin} from "../../../redux/userReducer";

const SignInTab = ({ email, setEmail, setPassword, password, signInHandler, loginAsGuest, buttonsVariant, errors, resetErrors }) => {
    const dispatch = useDispatch();

    const handleGoogleLoginSuccess = async (response) => {
        const idToken = response.credential;
        const accessToken = response.access_token; // Получите токен доступа здесь

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
            }
        } catch (error) {
            console.error('Error during Google login:', error);
        }
    };

    return (
        <Form className='d-flex flex-column'>
            <h2>Please log in</h2>
            <Form.Group className="mb-2">
                <Form.Label>Email address</Form.Label>
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
                <Form.Label>Password</Form.Label>
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
            </Form.Group>
            <Button
                variant={buttonsVariant}
                onClick={signInHandler}
                className='w-50 my-2 mx-auto'
            >Sign In</Button>
            <div className='text-center'>Or</div>
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
        </Form>
    );
}

export default React.memo(SignInTab);
