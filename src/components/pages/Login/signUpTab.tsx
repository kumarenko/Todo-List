import React from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";

const SignUpTab = ({ email, setEmail, setPassword, password, confirmPassword,setConfirmPassword, signUpHandler, buttonsVariant }) => (
    <Form className='d-flex flex-column'>
        <h2>Please register</h2>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control
                type="email"
                required
                value={email}
                onChange={event => setEmail(event.target.value)}
                placeholder="name@example.com"
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Your name</Form.Label>
            <Form.Control
                type="text"
                required
                onChange={event => setEmail(event.target.value)}
                placeholder="John"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Your Last Name</Form.Label>
            <Form.Control
                type="text"
                required
                onChange={event => setEmail(event.target.value)}
                placeholder="Smith"
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Password</Form.Label>
            <Form.Control
                value={password}
                required
                onChange={event => setPassword(event.target.value)}
                autoComplete={'exampleForm.ControlInput2'} type="password"
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
                value={confirmPassword}
                required
                onChange={event => setConfirmPassword(event.target.value)}
                autoComplete={'exampleForm.ControlInput2'} type="password"
            />
        </Form.Group>
        <Button
            onClick={(e) => signUpHandler(e)}
            variant={buttonsVariant}
            className='w-50 my-1 mx-auto'

        >Sign Up</Button>
    </Form>
);

export default SignUpTab;
