import React, {useState} from 'react';
import {Form, Button} from "react-bootstrap";
import {FaEye, FaEyeSlash} from "react-icons/fa";

const PasswordInput = ({value, onChange, isInvalid,validationErrorsMessage}) => {
    const [visible, setVisible] = useState(false);
    return (
        <div className='position-relative'>
            <Form.Control
                isInvalid={isInvalid}
                onChange={onChange}
                type={visible ? 'text' : 'password'}
                value={value}/>
            <Form.Control.Feedback type="invalid">
                {validationErrorsMessage}
            </Form.Control.Feedback>

            {!isInvalid && <Button
                className='eye-btn btn-link position-absolute top-0 end-0 p-0 d-flex align-items-center justify-content-start'
                onClick={() => setVisible(!visible)}>
                {visible ? <FaEyeSlash /> : <FaEye />}
            </Button>}
        </div>
    );
};

export default PasswordInput;