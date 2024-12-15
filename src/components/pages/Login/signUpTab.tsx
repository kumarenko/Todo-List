import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import {Button, Modal} from "react-bootstrap";
import {t} from "i18next";
import PasswordInput from "../../../common/passwordInput";
import ReactDOM from "react-dom";
import TermsOfUse from "../TermsOfUse/termsOfUse";
import {IoMdClose} from "react-icons/io";

const SignUpTab = ({ email, setEmail, name, setName,
                       registerPassword, setRegisterPassword, confirmPassword,
                       acceptTermsAndConditions, setAcceptTermsAndConditions,
                       setConfirmPassword, signUpHandler, errors, resetErrors }) => {

    const [toggleTermsModal, setTermsModal] = useState(false);
    const [togglePrivacyModal, setPrivacyModal] = useState(false);
    return (
        <Form className='d-flex flex-column' autoComplete="off">
            <Form.Group className="mb-2">
                <Form.Label className='subtitle'>{t('Email')}</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    autoComplete="email"
                    isInvalid={!!errors?.email}
                    onChange={event => {
                        resetErrors();
                        setEmail(event.target.value);
                    }}
                    placeholder="name@example.com"
                    name="email"
                />
                <Form.Control.Feedback type="invalid">
                    {errors?.email}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Label className='subtitle'>{t('Name')}</Form.Label>
                <Form.Control
                    type="text"
                    value={name}
                    autoComplete="name"
                    isInvalid={!!errors?.name}
                    onChange={event => {
                        resetErrors();
                        setName(event.target.value);
                    }}
                />
                <Form.Control.Feedback type="invalid">
                    {errors?.name}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-2" controlId="passSignUp">
                <Form.Label className='subtitle'>{t('Password')}</Form.Label>
                <PasswordInput
                    value={registerPassword}
                    isInvalid={!!errors?.password}

                    onChange={event => {
                        resetErrors();
                        setRegisterPassword(event.target.value);
                    }}
                    validationErrorsMessage={errors?.password}
                    autoComplete="new-password"
                />
            </Form.Group>
            <Form.Group className="mb-2" controlId="confirmPassSignUp">
                <Form.Label className='subtitle'>{t('Confirm password')}</Form.Label>
                <PasswordInput
                    value={confirmPassword}
                    isInvalid={!!errors?.confirmPassword}
                    onChange={event => {
                        resetErrors();
                        setConfirmPassword(event.target.value);
                    }}
                    validationErrorsMessage={errors?.confirmPassword}
                    autoComplete="new-password"
                />
            </Form.Group>
            <Form.Group className="mb-2 " controlId="ecceptTerms">
                <div className='d-flex flex-nowrap flex-row'>
                    <Form.Check
                        type={'checkbox'}
                        isInvalid={!!errors?.accept}
                        className='prod-checkbox me-2'
                        defaultChecked={acceptTermsAndConditions}
                        onChange={(e) => {
                            setAcceptTermsAndConditions(e.target.checked);
                            resetErrors();
                        }}
                    />
                    <Form.Label className='subtitle'>
                        {t('agreeText')}
                        <Button className='btn-link p-0' style={{marginTop: '-0.3rem'}} onClick={() => setTermsModal(true)}>{t('termsOfUse')}</Button>
                        {t('andAccept')}
                        <Button className='btn-link p-0' style={{marginTop: '-0.3rem'}} onClick={() => setPrivacyModal(true)}>{t('privacyPolicy')}</Button>
                    </Form.Label>
                </div>
                {errors?.accept ? <div style={{color: 'var(--bs-form-invalid-color)'}}>{t(errors.accept)}</div> : null}
            </Form.Group>
            <Button
                onClick={signUpHandler}
                className='my-2 mx-auto'
            >{t('Sign Up')}</Button>
            <TermsModal show={toggleTermsModal} onHide={() => setTermsModal(false)}/>
            <PrivacyModal show={togglePrivacyModal} onHide={() => setPrivacyModal(false)}/>
        </Form>
    );
}
const TermsModal = ({show, onHide}) => {
    return ReactDOM.createPortal(<Modal className='terms-modal' show={show} onHide={onHide} centered>
        <Modal.Body className='modal-styled-bg'>
            <Button type="button" className="position-absolute top-3 end-3 btn custom-close" aria-label="Close" onClick={onHide}>
                <IoMdClose size={20}/>
            </Button>
            <TermsOfUse/>
        </Modal.Body>
        <Modal.Footer className='modal-styled-bg empty-footer'/>
    </Modal>, document.body);
};
const PrivacyModal = ({show, onHide}) => {
    return ReactDOM.createPortal(<Modal className='terms-modal' show={show} onHide={onHide} centered>
        <Modal.Body className='modal-styled-bg'>
            <Button type="button" className="position-absolute top-3 end-3 btn custom-close" aria-label="Close" onClick={onHide}>
                <IoMdClose size={20}/>
            </Button>
            <TermsOfUse/>
        </Modal.Body>
        <Modal.Footer className='modal-styled-bg empty-footer'/>
    </Modal>, document.body);
};

export default React.memo(SignUpTab);