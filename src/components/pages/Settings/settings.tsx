import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {changeTheme} from "../../../actions/settings";
import Form from "react-bootstrap/Form";
import {findProductByBarcode} from "../../../actions/products";

const Settings = ({theme, changeTheme, title}) => {
    useEffect(() => {
        document.title = title
    }, []);
    const toggle = () => {
        const newTheme = theme === 'light' ? 'dark': 'light';
        changeTheme(newTheme);
    }
    return (
        <div className='homepage d-flex flex-column align-items-center'>
            <div className="d-flex justify-content-between h3 w-75 p-3">
                <h1>Settings</h1>
            </div>
            <div className="w-75 p-3">
                <Form.Check
                    type="switch"
                    defaultChecked={theme !== 'light'}
                    onChange={() => toggle()}
                    className='my-2'
                    label="Dark Mode"
                />
                <div>
                    <span className='m-1'>Select Units</span>
                    <Form.Select aria-label="Units" defaultValue={'metrics'} className='w-25'>
                        <option value="metric">Metric</option>
                        <option value="imperial">Imperial</option>
                    </Form.Select>
                </div>
                <div className="div">
                    <span className='m-1'>Select language:</span>
                    <Form.Select aria-label="language" defaultValue={'en'} className='w-25'>
                        <option value="en">English</option>
                        <option value="ua">Ukrainian</option>
                        <option value="pl">Polish</option>
                    </Form.Select>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    theme: state.settings.theme,
    productFromBarcode: state.items.productFromBarcode
})

const mapDispatchToProps = {
    changeTheme,
    findProductByBarcode,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);