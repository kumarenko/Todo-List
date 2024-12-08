import React from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import {t} from "i18next";
import PasswordInput from "../../../common/passwordInput";

const SignUpTab = ({ email, setEmail, name, setName, registerPassword, setRegisterPassword, confirmPassword, setConfirmPassword, signUpHandler, errors, resetErrors }) => {
    return (
        <Form className='d-flex flex-column p-3' autoComplete="off">
            <Form.Group className="mb-2">
                <Form.Label className='subtitle'>{t('Email')}</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    autoComplete="email"
                    isInvalid={!!errors?.email}
                    onChange={event => {
                        resetErrors();
                        setEmail(event.target.value);
                    }}
                    placeholder="name@example.com"
                    name="email"
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
                    autoComplete="name"
                    isInvalid={!!errors?.name}
                    onChange={event => {
                        resetErrors();
                        setName(event.target.value);
                    }}
                />
                <Form.Control.Feedback type="invalid">
                    {errors?.name}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-2" controlId="passSignUp">
                <Form.Label className='subtitle'>{t('Password')}</Form.Label>
                <PasswordInput
                    value={registerPassword}
                    isInvalid={!!errors?.password}

                    onChange={event => {
                        resetErrors();
                        setRegisterPassword(event.target.value);
                    }}
                    validationErrorsMessage={errors?.password}
                    autoComplete="new-password"
                />
            </Form.Group>
            <Form.Group className="mb-2" controlId="confirmPassSignUp">
                <Form.Label className='subtitle'>{t('Confirm password')}</Form.Label>
                <PasswordInput
                    value={confirmPassword}
                    isInvalid={!!errors?.confirmPassword}
                    onChange={event => {
                        resetErrors();
                        setConfirmPassword(event.target.value);
                    }}
                    validationErrorsMessage={errors?.confirmPassword}
                    autoComplete="new-password"
                />
            </Form.Group>
            <Button
                onClick={signUpHandler}
                className='my-2 mx-auto'
            >{t('Sign Up')}</Button>
        </Form>
    );
}

export default React.memo(SignUpTab);