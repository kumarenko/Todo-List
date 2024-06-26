import React from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";

const SignUpTab = ({ email, setEmail, name, setName, lastName, setLastName, password, setPassword, confirmPassword, setConfirmPassword, signUpHandler, buttonsVariant, errors, resetErrors }) => {
    return (
        <Form className='d-flex flex-column'>
            <h2>Please sign up</h2>
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
            <Form.Group className="mb-2">
                <Form.Label>Name</Form.Label>
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
            <Form.Group className="mb-2">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    type="text"
                    value={lastName}
                    isInvalid={!!errors?.lastName}
                    onChange={event => {
                        resetErrors();
                        setLastName(event.target.value)
                    }}
                    placeholder="Doe"
                />
                <Form.Control.Feedback type="invalid">
                    {errors?.lastName}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-2" controlId="passSignUp">
                <Form.Label>Password</Form.Label>
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
                <Form.Label>Confirm Password</Form.Label>
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
                variant={buttonsVariant}
                onClick={signUpHandler}
                className='w-50 my-2 mx-auto'
            >Sign Up</Button>
        </Form>
    );
}

export default React.memo(SignUpTab);