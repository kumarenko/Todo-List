import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from "react-redux";
import {updateProfileSuccessMessage} from "../redux/userReducer";
import {Alert} from "react-bootstrap";
import {inviteUsersRequest} from "../actions/shoppingLists";

const CustomMessage = ({successMessage}) => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState(successMessage);
    const dispatch = useDispatch();

    useEffect(() =>{
        setMessage(successMessage);
        if(successMessage) {
            setVisible(true);
            setTimeout(() => {
                dispatch(updateProfileSuccessMessage(''));
                setMessage('');
                setVisible(false);
            }, 2500);
        }
    }, [successMessage]);
    console.log(visible, successMessage);
    return (visible && successMessage ? <Alert
        onAnimationEnd={() => {

        }}
        className='popup position-fixed'>
        {message}
    </Alert>: null);
};

const mapStateToProps = (state) => {
    console.log(state.user);
    return {
        successMessage: state.user.successMessage,
    };
};
const mapDispatchToProps = {
    inviteUsersRequest
};

export default connect(mapStateToProps,mapDispatchToProps)(CustomMessage)
