import React from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import {t} from "i18next";

const SignUpTab = ({ email, setEmail, name, setName, password, setPassword, confirmPassword, setConfirmPassword, signUpHandler, errors, resetErrors }) => {
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
            <Form.Group className="mb-2">
                <Form.Label className='subtitle'>{t('Name')}</Form.Label>
                <Form.Control
                    type="text"
                    value={name}
                    isInvalid={!!errors?.name}
                    onChange={event => {
                        resetErrors();
                        setName(event.target.value)
                    }}
                    placeholder="John"
                />
                <Form.Control.Feedback type="invalid">
                    {errors?.name}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-2" controlId="passSignUp">
                <Form.Label className='subtitle'>{t('Password')}</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    isInvalid={!!errors?.password}
                    onChange={event => {
                        resetErrors();
                        setPassword(event.target.value)
                    }}
                    autoComplete={'passSignUp'}
                />
                <Form.Control.Feedback type="invalid">
                    {errors?.password}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-2" controlId="confirmPassSignUp">
                <Form.Label className='subtitle'>{t('Confirm password')}</Form.Label>
                <Form.Control
                    type="password"
                    value={confirmPassword}
                    isInvalid={!!errors?.confirmPassword}
                    onChange={event => {
                        resetErrors();
                        setConfirmPassword(event.target.value)
                    }}
                    autoComplete={'confirmPassSignUp'}
                />
                <Form.Control.Feedback type="invalid">
                    {errors?.confirmPassword}
                </Form.Control.Feedback>
            </Form.Group>
            <Button
                onClick={signUpHandler}
                className='my-2 mx-auto'
            >{t('Sign Up')}</Button>
        </Form>
    );
}

export default React.memo(SignUpTab);