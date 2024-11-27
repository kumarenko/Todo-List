import React, {useState} from 'react';
import {Alert} from "react-bootstrap";
import './styles.less';
const CustomAlert = ({...props}) => {
    const [visible, setVisible] = useState(true);
    if(props.children) {
        return (
            visible && <Alert variant={props.variant}
                              onAnimationEnd={() => setVisible(false)}
                              className='popup position-absolute'>
                {props.children}
            </Alert>
        );
    }
};

export default CustomAlert;