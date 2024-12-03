import React, { useState, useRef } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import Message from "../../../../common/message";
import {sendCode} from "../../../../actions/login";
import {t} from "i18next";
import {IoMdClose} from "react-icons/io";

const ConfirmCode = ({ email, onApply, onBack, code, setCode, onHide }) => {
    const [loading, setLoading] = useState(false);
    const inputRefs = useRef([]);
    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (value, index) => {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
        if (value && index < 3) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleConfirmCode = async () => {
        const completedCode = code.join('');
        if (completedCode.length < 4) {
            setResponseMessage(t('The code must be 4 digits long'));
            setTimeout(() => {
                setResponseMessage('');
            }, 2500);
        } else {
            setLoading(true);
            try {
                const result = await sendCode(email, completedCode);
                if(result.ok) {
                    onApply();
                } else {
                    const data = await result.json();
                    if(data.message) {
                        setResponseMessage(t('Too many attempts. Code expired'));
                        setTimeout(() => {
                            setResponseMessage('');
                        }, 2500);
                    } else {
                        setResponseMessage(t('invalidСode', {attempts: data.attempts}));
                        setTimeout(() => {
                            setResponseMessage('');
                        }, 2500);
                    }

                }
            } catch (error) {
                setTimeout(() => {
                    setResponseMessage('');
                }, 2500);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
       <>
           <Message text={responseMessage}/>
           <Modal.Header className='modal-styled-bg'>
               <Modal.Title className='title'>{t('Code was sent to your e-mail address, please enter it below')}</Modal.Title>
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
               <div className="d-flex justify-content-center gap-2">
                   {code.map((digit, index) => (
                       <Form.Control
                           key={index}
                           type="number"
                           maxLength="1"
                           value={digit}
                           onChange={e => handleChange(e.target.value, index)}
                           onKeyDown={e => handleKeyPress(e, index)}
                           ref={el => (inputRefs.current[index] = el)}
                       />
                   ))}
               </div>
           </Modal.Body>
           <Modal.Footer className='modal-styled-bg d-flex justify-content-center'>
               <Button onClick={onBack} className='mx-2'>
                   {t('Back')}
               </Button>
               <Button onClick={()=> handleConfirmCode()} disabled={loading} className='mx-2'>
                   {t('Confirm')}
               </Button>
           </Modal.Footer>
       </>
    );
};

export default ConfirmCode;
