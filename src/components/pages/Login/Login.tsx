import React, {useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';
import {Alert, Button} from "react-bootstrap";
import {connect, useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom'
import {setUserData, signInAction} from "../../../actions/login";
import logo from './../../../media/logo.png';
import './styles.less';
import {validateSignInForm} from "../../../helpers/validator";

const LoginPage = ({user, setUserData,signInAction}) => {
    const theme = useSelector(state => state.settings.theme);
    const buttonsVariant = theme === 'light' ? 'primary' : 'dark';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState([]);
    const navigate = useNavigate();
     const loginAsGuest = () => {
        setUserData(!user.isAuthorized);
    }
    useEffect(() => {
        console.log(user.errorMessage);

        if(user.isAuthorized) {
            navigate('/');
        }
         else if(user.errorMessage) {
             setErrorMessage([user.errorMessage]);
             setShowPopup(true);
        }
    },[user]);

     const signInHandler = () => {
         const errors = validateSignInForm({email, password});
         console.log(errors.join('\n'));
         setErrorMessage(validateSignInForm({email, password}));
         if(errors.length) {
             setShowPopup(true);
         } else {
             signInAction({email, password});
         }
     }
     const signUpHandler = () => {

     }

    if(!user.isAuthorized) {
        return (
            <div className='login container-sm my-auto h-100 d-flex align-items-center justify-content-center'>
                <div className="login-content d-flex flex-column align-items-center justify-content-center">
                    <img src={logo} alt="Broken logo"/>
                    <Form>
                        <h2>Please log in</h2>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                onChange={event => {
                                    setEmail(event.target.value);
                                }}
                                placeholder="name@example.com" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                onChange={event => setPassword(event.target.value)}
                                autoComplete={'exampleForm.ControlInput2'} type="password"/>
                        </Form.Group>
                    </Form>

                    <Button
                        variant={buttonsVariant}
                        onClick={()=>signInHandler()}
                        className='w-50 my-2 mx-auto'>Sign In</Button>
                    <span className='mx-2 mt-1 text-center'>Don't have an account? Please sign up below</span>
                    <Button variant={buttonsVariant} className='w-50 my-1'>Sign Up</Button>
                    <span className='mx-2 mt-1 text-center'>Or</span>
                    <Button variant={buttonsVariant} className='w-50 my-1' onClick={() => loginAsGuest()}>Enter as a Guest</Button>
                </div>
                {showPopup ? <Alert onAnimationEnd={()=> setShowPopup(false)} variant='danger' className='popup'>
                    {errorMessage.map(message => <div key={message} className='text-center'>{message}</div>)}
                </Alert>: null}
            </div>
        );
    }
};


const mapStateToProps = (state) => ({
    user: state.user
})

const mapDispatchToProps = {
    setUserData,
    signInAction
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);