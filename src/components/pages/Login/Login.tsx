import React from 'react';
import Form from 'react-bootstrap/Form';
import {Button} from "react-bootstrap";
import {useSelector} from "react-redux";

import logo from './../../../media/logo.png';
import './styles.less';

const LoginPage = () => {

    const theme = useSelector(state => state.settings.theme);
    const buttonsVariant = theme === 'light' ? 'primary' : 'dark';

    return (
        <div className='login container-sm my-auto h-100 d-flex align-items-center justify-content-center'>
            <div className="login-content d-flex flex-column align-items-center justify-content-center">
                <img src={logo} alt="Broken logo"/>
                <h2 className={''}>Please log in</h2>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"/>
                </Form.Group>
                <Button variant={buttonsVariant} className='w-50 my-2 mx-auto'>Sign In</Button>
                <span className='mx-2 mt-1 text-center'>Don't have an account? Please sign up below</span>
                <Button variant={buttonsVariant} className='w-50 my-1'>Sign Up</Button>
                <span className='mx-2 mt-1 text-center'>Or</span>
                <Button variant={buttonsVariant} className='w-50 my-1'>Enter as a Guest</Button>
            </div>
        </div>
    );
};

export default LoginPage;