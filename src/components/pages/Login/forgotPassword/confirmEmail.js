import React, {useState} from 'react';
import {Button, Modal, Spinner} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import {validateEmail} from "../../../../helpers/validator";
import {requestResetPassword} from "../../../../actions/login";
import Message from "../../../../common/message";

const ConfirmEmail = ({onHide, onApply, email, setEmail}) => {
    const [error, setError] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const confirmEmail = async () => {
        if (!validateEmail(email).length) {
            setLoading(true);
            const result = await requestResetPassword(email);
            if (result.ok) {
                onApply();
            } else if(result.status === 404) {
                setResponseMessage('User does not found');
                setTimeout(() => {
                    setResponseMessage('');
                }, 2500)
            } else {
                setResponseMessage('Server error');
            }
            setLoading(false);
        } else {
            setError(validateEmail(email));
            setLoading(false);
        }
    };
    return <>
        <Modal.Header className='modal-styled-bg justify-content-center'>
            <Message text={responseMessage}/>
            <Modal.Title className='title'>Enter your email</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-styled-bg'>
            {loading && (
                <div className="position-fixed start-0 top-0 w-100 h-100 d-flex justify-content-center align-items-center modal-loader">
                    <Spinner animation="border" />
                </div>
            )}
            <Form.Label htmlFor="email" className='subtitle'>Your Email: </Form.Label>
            <Form.Control
                type="email"
                id="email"
                isInvalid={error.length}
                value={email}
                onChange={(e)=> {
                    setEmail(e.target.value);
                    setError('');
                }}
            />
            <div className='feedback-space'>
                <Form.Control.Feedback type="invalid">
                    {error}
                </Form.Control.Feedback>
            </div>
        </Modal.Body>
        <Modal.Footer className='modal-styled-bg justify-content-around'>
            <Button onClick={onHide}>
                Cancel
            </Button>
            <Button onClick={confirmEmail}>
                Apply
            </Button>
        </Modal.Footer>
    </>;
};

export default ConfirmEmail;
