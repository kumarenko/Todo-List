import React from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";

const SignInTab = ({email, setEmail, setPassword, password, signInHandler, loginAsGuest, buttonsVariant, errors, resetErrors }) => {
    return <Form className='d-flex flex-column'>
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
                value={password}
                isInvalid={!!errors.password}
                onChange={event => {
                    resetErrors();
                    setPassword(event.target.value);
                }}
                type="password"
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
    </Form>
}

export default SignInTab;
