import React, { useState } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import {changePassword} from "../../../../actions/login";
import {t} from "i18next";
import {IoMdClose} from "react-icons/io";
import PasswordInput from "../../../../common/passwordInput";
import {addMessageToQueue} from "../../../../redux/settingsReducer";
import {useDispatch} from "react-redux";
import {validateForgotPassword} from "../../../../helpers/validator";

const ChangePassword = ({ email, onApply, onBack, onHide }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const handlePasswordChange = async () => {
        setErrors(validateForgotPassword({password, confirmPassword}));
        if(Object.keys(validateForgotPassword({password, confirmPassword})).length === 0) {
            try {
                setLoading(true);
                const result = await changePassword(email, password);
                if(result.ok) {
                    dispatch(addMessageToQueue({message: t('Password successfully changed'), type: 'success'}));
                    setLoading(false);
                    setTimeout(() => {
                        onApply();
                    }, 2500);
                } else {
                    dispatch(addMessageToQueue({message: t('An error occurred while changing the password'), type: 'error'}));
                    setLoading(false);
                }
            } catch (err) {
                dispatch(addMessageToQueue({message: t('An error occurred while changing the password'), type: 'error'}));
                setLoading(false);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <>
            <Modal.Header className='modal-styled-bg'>
                <Modal.Title className='title'>{t('Change Password')}</Modal.Title>
                <Button type="button" className="btn custom-close" aria-label="Close" onClick={onHide}>
                    <IoMdClose size={20}/>
                </Button>
            </Modal.Header>
            <Modal.Body className='modal-styled-bg'>
                {loading && (
                    <div className="position-fixed start-0 top-0 w-100 h-100 d-flex justify-content-center align-items-center modal-loader">
                        <Spinner animation="border" />
                    </div>
                )}
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label className='subtitle'>{t('New password')}</Form.Label>
                        <PasswordInput
                            value={password}
                            isInvalid={errors.password}
                            onChange={e => {
                                setPassword(e.target.value);
                                setErrors({});
                            }}
                            validationErrorsMessage={errors.password}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className='subtitle'>{t('Confirm new password')}</Form.Label>
                        <PasswordInput
                            isInvalid={errors.confirmPassword}
                            value={confirmPassword}
                            onChange={e => {
                                setConfirmPassword(e.target.value);
                                setErrors({});
                            }}
                            validationErrorsMessage={errors.confirmPassword}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className='modal-styled-bg d-flex justify-content-center'>
                <Button variant="secondary" onClick={onBack}>
                    {t('Back')}
                </Button>
                <Button variant="primary" onClick={handlePasswordChange} disabled={loading}>
                    {t('Change Password')}
                </Button>
            </Modal.Footer>
        </>
    );
};

export default ChangePassword;
