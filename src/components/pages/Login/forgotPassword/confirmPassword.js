import React, { useState } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import {changePassword} from "../../../../actions/login";
import Message from "../../../../common/message";
import {t} from "i18next";
import {IoMdClose} from "react-icons/io";
import PasswordInput from "../../../../common/passwordInput";

const ChangePassword = ({ email, onApply, onBack, onHide }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

    const handlePasswordChange = async () => {
        if (confirmPassword !== password) {
            setErrors({...errors, match: t('Passwords do not match')});
            return;
        } if (confirmPassword.length < 8) {
            setErrors({...errors, confirmPassword: t('New password is too short')});
            return;
        } if (password.length < 8) {
            setErrors({...errors, password: t('Password is too short')});
        } else {
            setLoading(true);
            setErrors({});
            if(Object.keys(errors).length === 0) {
                try {
                    const result = await changePassword(email, password);
                    if(result.ok) {
                        setMessage(t('Password successfully changed'));
                        setTimeout(() => {
                            setMessage('');
                            onApply();
                        }, 2500);
                    } else {
                        setMessage(t('An error occurred while changing the password'));
                        setTimeout(() => {
                            setMessage('');
                        }, 2500);
                    }
                } catch (err) {
                    setMessage(t('An error occurred while changing the password'));
                    setTimeout(() => {
                        setMessage('');
                    }, 2500);
                } finally {
                    setLoading(false);
                }
            }
        }
    };

    return (
        <>
            <Message text={message}/>
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
                            isInvalid={errors.match || errors.confirmPassword}
                            value={confirmPassword}
                            onChange={e => {
                                setConfirmPassword(e.target.value);
                                setErrors({});
                            }}
                            validationErrorsMessage={errors.match}
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
