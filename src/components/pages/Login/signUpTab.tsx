import React from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";

const SignUpTab = ({ email, setEmail,name, setName, lastName, setLastName, password, setPassword, confirmPassword,setConfirmPassword, signUpHandler, buttonsVariant, errors, resetErrors }) =>
    <Form className='d-flex flex-column'>
        <h2>Please register</h2>
        <Form.Group className="mb-2">
            <Form.Label>Email address</Form.Label>
            <Form.Control
                type="email"
                required
                value={email}
                isInvalid={errors?.email}
                onChange={event => {
                    resetErrors();
                    setEmail(event.target.value);
                }}
                placeholder="name@example.com"
            />
            <Form.Control.Feedback type="invalid">
                {errors?.email}
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-2">
            <Form.Label>Your name</Form.Label>
            <Form.Control
                type="text"
                required
                value={name}
                onChange={event => {
                    resetErrors();
                    setName(event.target.value);
                }}
                isInvalid={errors?.name}
                placeholder="John"
            />
            <Form.Control.Feedback type="invalid">
                {errors?.name}
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-2">
            <Form.Label>Your Last Name</Form.Label>
            <Form.Control
                type="text"
                required
                value={lastName}
                isInvalid={errors?.lastName}
                onChange={event => {
                    resetErrors();
                    setLastName(event.target.value)
                }}
                placeholder="Smith"
            />

            <Form.Control.Feedback type="invalid">
                {errors?.lastName}
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-2" controlId="pass">
            <Form.Label>Password</Form.Label>
            <Form.Control
                value={password}
                required

                autoComplete={'pass'}
                isInvalid={errors?.password}
                onChange={event => {
                    resetErrors();
                    setPassword(event.target.value);
                }}
                type="password"
            />

            <Form.Control.Feedback type="invalid">
                {errors?.password}
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-2" controlId="passConfirm">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
                value={confirmPassword}
                required

                autoComplete={'passConfirm'}
                isInvalid={errors?.confirmPassword}
                onChange={event => {
                    resetErrors();
                    setConfirmPassword(event.target.value);
                }}
                type="password"
            />

            <Form.Control.Feedback type="invalid">
                {errors?.confirmPassword}
            </Form.Control.Feedback>
        </Form.Group>
        <Button
            onClick={(e) => signUpHandler(e)}
            variant={buttonsVariant}
            className='w-50 my-1 mx-auto'

        >Sign Up</Button>
    </Form>
;

export default SignUpTab;
