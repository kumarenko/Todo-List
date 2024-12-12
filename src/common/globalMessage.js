import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { removeMessageFromQueue } from "../redux/settingsReducer";
import {MdError} from "react-icons/md";
import {FaCheckCircle} from "react-icons/fa";

const GlobalMessage = () => {
    const dispatch = useDispatch();
    const messages = useSelector(state => state.settings.messagesQueue);
    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            if (messages.length > 0) {
                const oldestMessage = messages[0];
                if (now - oldestMessage.createdAt >= 3000) {
                    dispatch(removeMessageFromQueue());
                }
            }
        }, 500);
        return () => clearInterval(interval);
    }, [messages, dispatch]);

    return (
        <div className="d-flex flex-column-reverse position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1056 }}>
            {messages ? messages.map((message) => (
                <div key={message.createdAt}
                     className={`global-message d-flex align-items-center bg-success title mx-1 rounded bg-${message.type === 'error' ? 'danger': 'success'}`}>
                    {message.type === 'error' ? <MdError className='mx-1' /> : <FaCheckCircle className='mx-1' />}
                    {message.value}
                </div>
            )) : null}
        </div>
    );
};

export default GlobalMessage;
