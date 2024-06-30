import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {changeTheme} from "../../../actions/settings";
import Form from "react-bootstrap/Form";
import BarcodeScanner from "./test";

const Settings = ({theme, changeTheme, title}) => {
    useEffect(() => {
        document.title = title
    }, []);
    const [toggle1, setToggle] = useState(false);
    const [code, setCode] = useState('');
    const [barData, setBarData] = useState({});

    const toggle = () => {
        const newTheme = theme === 'light' ? 'dark': 'light';
        changeTheme(newTheme);
    }
    const handleDetected = (result) => {
        console.log("Barcode detected: " + result.codeResult.code);
        setCode(result.codeResult.code);
        setToggle(!toggle1);
    };


    const fetchProductData = async () => {
        const proxyurl = "https://cors-anywhere.herokuapp.com/"; // Use a proxy to avoid CORS error
        const api_key = "qvq6xf6o09nzs4pf9qn428l5b6lnfj";

        const url = proxyurl + `https://api.barcodelookup.com/v3/products?barcode=${code}&formatted=y&key=` + api_key;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    useEffect(()=> {
        if(code) {
            fetchProductData()
                .then(data => {
                    setBarData(data);
                    console.log(data, 'bar');

                })
                .catch(err => console.error('Error fetching product data:', err));
        }
    }, [code]);
    return (
        <div className='homepage d-flex flex-column align-items-center'>
            <div className="d-flex justify-content-between h3 w-75 p-3">
                <h1>Settings</h1>
                {toggle1 ? <BarcodeScanner onDetected={handleDetected}/> : null}
            </div>
            <div className="w-75 p-3">
                <button onClick={()=> setToggle(!toggle1)}>Close</button>
                {barData.products ? <div>
                    {barData.products[0].title}
                    <img src={barData.products[0].images[0] ?? ''} alt=""/>
                </div> : null}
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
    theme: state.settings.theme
})

const mapDispatchToProps = {
    changeTheme,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);