import React, { useState, useRef } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import {sendCode} from "../../../../actions/login";
import {t} from "i18next";
import {IoMdClose} from "react-icons/io";
import {addMessageToQueue} from "../../../../redux/settingsReducer";
import {useDispatch} from "react-redux";

const ConfirmCode = ({ email, onApply, onBack, code, setCode, onHide }) => {
    const [loading, setLoading] = useState(false);
    const inputRefs = useRef([]);
    const dispatch = useDispatch();

    const handleChange = (value, index) => {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
        if (value && index < 3) {
            inputRefs.current[index + 1].focus();
        }
    };
    const handlePaste = (event) => {
        let pastedText = event.clipboardData.getData('Text');
        pastedText = pastedText.replace(/[^0-9]/g, '');
        event.preventDefault();

        const newCode = [...code];

        for (let i = 0; i < Math.min(pastedText.length, 4); i++) {
            newCode[i] = pastedText[i];
        }
        setCode(newCode);

        const nextIndex = newCode.findIndex(digit => !digit);
        if (nextIndex !== -1 && inputRefs.current[nextIndex]) {
            inputRefs.current[nextIndex].focus();
        } else if (inputRefs.current[3]) {
            inputRefs.current[3].blur();
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
            dispatch(addMessageToQueue({message: t('The code must be 4 digits long'), type: 'error'}));
        } else {
            setLoading(true);
            try {
                const result = await sendCode(email, completedCode);
                if(result.ok) {
                    onApply();
                } else {
                    const data = await result.json();
                    if(data.message) {
                        dispatch(addMessageToQueue({message: t('Too many attempts. Code expired'), type: 'error'}));
                    } else {
                        dispatch(addMessageToQueue({message: t('invalidСode', {attempts: data.attempts}), type: 'error'}));
                    }
                }
            } catch (error) {
                setLoading(false);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
       <>
           <Modal.Header className='modal-styled-bg'>
               <Modal.Title className='title text-break'>{t('Code was sent to your e-mail address, please enter it below')}</Modal.Title>
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
                           onPaste={handlePaste}
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
