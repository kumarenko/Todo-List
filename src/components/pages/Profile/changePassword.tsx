import React, {useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import {validateChangePassword} from "../../../helpers/validator";
import {useDispatch} from "react-redux";
import {updateProfileInfo} from "../../../actions/login";

const ChangePassword = ({userId, googleId}) => {

    const dispatch = useDispatch();
    const [allowChange, setAllowChange] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [validationErrors, setValidationErrors] = useState({});

    const changePasswordHandler = () => {
        let errors = validateChangePassword(currentPassword, newPassword, confirmNewPassword, googleId);
        console.log(errors,Object.keys(errors));
        if(Object.keys(errors).length) {
            setValidationErrors(errors);
        } else {
            dispatch(updateProfileInfo(userId, {password: currentPassword, newPassword: newPassword}));
        }
    }
    const resetErrors =() => {
        setValidationErrors({});
    }
    return (
        <Container  fluid="md" className='user-info d-flex w-75 flex-wrap flex-column mb-2'>
            {allowChange ? <>
                    {googleId}
                    {!googleId ? <div>
                        <h5>{googleId ? 'Your Current password' : 'Your Current password'}</h5>
                        <Form.Control
                            isInvalid={!!validationErrors.password}
                            onChange={(e) => {
                                resetErrors()
                                setCurrentPassword(e.target.value)
                            }} type="password" value={currentPassword}/>
                        <Form.Control.Feedback type="invalid">
                            {validationErrors.password}
                        </Form.Control.Feedback>
                    </div> : null}
                    <div>
                        <h5>Enter new password</h5>
                        <Form.Control
                            isInvalid={!!validationErrors.newPassword}
                            onChange={(e) => {
                                resetErrors();
                                setNewPassword(e.target.value)
                            }} type="password" value={newPassword}/>
                        <Form.Control.Feedback type="invalid">
                            {validationErrors.newPassword}
                        </Form.Control.Feedback>
                    </div>
                    <div>
                    <h5>Confirm password</h5>
                    <Form.Control
                        isInvalid={!!validationErrors.confirmPassword}
                        onChange={(e) => {
                            resetErrors();
                            setConfirmNewPassword(e.target.value)
                        }} type="password" value={confirmNewPassword}/>
                    <Form.Control.Feedback type="invalid">
                        {validationErrors.confirmPassword}
                    </Form.Control.Feedback>
                </div>
                <div className='d-flex justify-content-between'>
                    <Button onClick={()=>changePasswordHandler()}>Apply</Button>
                    <Button onClick={() => {
                        setCurrentPassword('');
                        setNewPassword('');
                        setConfirmNewPassword('');
                        resetErrors();
                        setAllowChange(false)
                    }}>Cancel</Button>
                </div>
            </> :
                <div>
                    <span className='button-as-link' onClick={() => setAllowChange(true)}>Change password</span>
                </div>}
        </Container>
    );
};

export default ChangePassword;
