import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {updateProfileSuccessMessage} from "../redux/userReducer";
import {Alert} from "react-bootstrap";

const Message = ({text}) => {
    const [visible, setVisible] = useState(true);

    const [message, setMessage] = useState(text);

    useEffect(() =>{
        setMessage(text);
        if(text) {
            setVisible(true);
        }
    }, [text])
    return (visible && message ? <Alert
            onAnimationEnd={() => {
                setVisible(false);
                setMessage('');
            }}
            className='popup position-fixed'>
            {message}
        </Alert>: null);
};

export default Message;