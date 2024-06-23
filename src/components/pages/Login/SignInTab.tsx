import React from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";

const SignInTab = ({email, setEmail, setPassword, password, signInHandler, loginAsGuest, buttonsVariant }) => (
    <Form className='d-flex flex-column'>
        <h2>Please log in</h2>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control
                type="email"
                value={email}
                onChange={event => setEmail(event.target.value)}
                placeholder="name@example.com"
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Password</Form.Label>
            <Form.Control
                value={password}
                onChange={event => setPassword(event.target.value)}
                autoComplete={'exampleForm.ControlInput2'} type="password"
            />
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
);

export default SignInTab;
