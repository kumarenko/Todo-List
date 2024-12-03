import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import {validateChangePassword} from "../../../helpers/validator";
import {useDispatch} from "react-redux";
import {updateProfileInfo} from "../../../actions/login";
import {t} from "i18next";
import PasswordInput from "../../../common/passwordInput";

const ChangePassword = ({setLoading, userId, googleId}) => {

    const dispatch = useDispatch();
    const [allowChange, setAllowChange] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [validationErrors, setValidationErrors] = useState({});

    const changePasswordHandler = async () => {
        let errors = validateChangePassword(currentPassword, newPassword, confirmNewPassword, googleId);
        console.log(errors,Object.keys(errors));
        if(Object.keys(errors).length) {
            setValidationErrors(errors);
        } else {
            setLoading(true);
            await dispatch(updateProfileInfo(userId, {password: currentPassword, newPassword: newPassword}));
            setLoading(false);
        }
    }
    const resetErrors =() => {
        setValidationErrors({});
    }
    return (
        <Container fluid="md" className='user-info d-flex w-100 flex-wrap flex-column mb-2 px-3 py-1 justify-content-center align-items-center'>
            {allowChange ? <>
                    {googleId}
                    {!googleId ? <div className='input-container mb-2 mt-2 w-50'>
                        <h5 className='title mb-1'>{googleId ? t('Your current password') : t('Your current password')}</h5>
                        <PasswordInput
                            isInvalid={!!validationErrors.password}
                            validationErrorsMessage={validationErrors.password}
                            onChange={(e) => {
                                resetErrors()
                                setCurrentPassword(e.target.value)
                            }}
                            value={currentPassword}/>
                    </div> : null}
                    <div className='input-container mb-2 w-50'>
                        <h5 className='title mb-1'>{t('Enter new password')}</h5>
                        <PasswordInput
                            isInvalid={!!validationErrors.newPassword}
                            validationErrorsMessage={validationErrors.newPassword}
                            onChange={(e) => {
                                resetErrors();
                                setNewPassword(e.target.value)
                            }} value={newPassword}/>
                    </div>
                    <div className='input-container mb-2 w-50'>
                        <h5 className='title mb-1'>{t('Confirm new password')}</h5>
                        <PasswordInput
                            isInvalid={!!validationErrors.confirmPassword}
                            validationErrorsMessage={validationErrors.confirmPassword}
                            onChange={(e) => {
                                resetErrors();
                                setConfirmNewPassword(e.target.value)
                            }}
                            value={confirmNewPassword}/>
                    </div>
                <div className='d-flex justify-content-between'>
                    <Button onClick={()=>changePasswordHandler()} className='my-2 me-1'>{t('Apply')}</Button>
                    <Button className='my-2 ms-1'
                            onClick={() => {
                        setCurrentPassword('');
                        setNewPassword('');
                        setConfirmNewPassword('');
                        resetErrors();
                        setAllowChange(false)
                    }}>{t('Cancel')}</Button>
                </div>
            </> :
                <Button className='btn-link p-1 button-as-link' onClick={() => setAllowChange(true)}>{t('Change Password')}</Button>}
        </Container>
    );
};

export default ChangePassword;
