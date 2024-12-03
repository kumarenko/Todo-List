import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {Modal} from "react-bootstrap";
import ConfirmCode from "./confirmCode";
import ConfirmEmail from "./confirmEmail";
import ChangePassword from "./confirmPassword";

const ForgotPasswordModal = ({show, onHide}) => {
    const [state, setState] = useState('email');
    const [email, setEmail] = useState('');
    const [code, setCode] = useState(['', '', '', '']);

    const goBack = () => {
        if (state === 'email') {
            onHide();
        } else if (state === 'code') {
            setState('email');
        } else if(state === 'password') {
            setState('code');
        }
    }
    const confirmEmail = () => {
        setState('code');
    }
    const confirmCode = () => {
        setState('password');
    }
    const closeAndResetData = () => {
        onHide();
        setState('email');
        setEmail('');
        setCode(['', '', '', '']);
    }
    return ReactDOM.createPortal(<Modal show={show} onHide={closeAndResetData} centered>
        {state === 'email' && <ConfirmEmail onApply={confirmEmail} onBack={goBack} email={email} setEmail={setEmail} onHide={closeAndResetData}/>}
        {state === 'code' && <ConfirmCode onApply={confirmCode} onBack={goBack} code={code} setCode={setCode} email={email} onHide={closeAndResetData} />}
        {state === 'password' && <ChangePassword onApply={closeAndResetData} onBack={goBack} onHide={closeAndResetData} email={email}/>}
    </Modal>, document.body);
};

export default ForgotPasswordModal;
