import React, {useCallback, useState} from 'react';
import ReactDOM from 'react-dom';
import {Button, Form, Image, InputGroup, Modal} from "react-bootstrap";
import {t} from "i18next";
import {IoMdAdd, IoMdBarcode, IoMdClose, IoMdSearch} from "react-icons/io";
import {addProductToList, findProductByBarcode} from "../../../../actions/products";
import {connect, useDispatch} from "react-redux";
import {MdShoppingCart} from "react-icons/md";
import {addMessageToQueue} from "../../../../redux/settingsReducer";
import {preventCharacters} from "../../../../helpers/helper";
import BarcodeScanner from "./barcodeScanner";
const customProductsUnits = ['pcs', 'g', 'kg', 'oz', 'lb', 'ml', 'l', 'gal'];

const BarcodeModal = ({list, isVisible, onClose, addProductToList}) => {
    const dispatch = useDispatch();
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [toggleMobileBarcodeModal, setMobileToggleBarcodeModal] = useState(false);

    const elemInList = list.products.find(elem => elem.name === name);

    const sendCode = async (code) => {
        if(code.trim()) {
            const res = await findProductByBarcode(code.trim());
            if(res.ok) {
                const prod = await res.json();
                setName(prod.name);
                setAvatar(prod.avatar);
            } else {
                dispatch(addMessageToQueue({message: t('Product was not found'), type: 'error'}));
            }
        }
    }
    const addProductFromBarcode = async () => {
        if(!elemInList) {

            const prod = {
                _id: null,
                name: name,
                avatar: avatar,
                category: 'OTHER',
                count: 1,
                checked: false,
                price: 0,
                selectedUnits: customProductsUnits[0],
                availableUnits: customProductsUnits,
                selectionCount: 1,
            };
            await addProductToList(list._id, prod);
            setName('');
            setAvatar(null);
            dispatch(addMessageToQueue({message: t('Product successfully added to the list'), type: 'success'}));
        } else {
            dispatch(addMessageToQueue({message: t('Product already added to the list'), type: 'success'}));
        }
    }

    const handleDetect = useCallback(async (codeFromCamera) => {
        setCode(codeFromCamera);
        await sendCode(codeFromCamera);
    }, [code]);

    return ReactDOM.createPortal(
        <Modal
            show={isVisible}
            onHide={() => {
                onClose();
                setName('');
                setAvatar(null);
                setCode('');
            }}
            centered
            className='barcode-modal px-2'>
            <Modal.Header className='modal-styled-bg d-flex flex-column justify-content-center'>
                <Modal.Title className='title'>{t('Add product by barcode')}</Modal.Title>
                <Button type="button" className="position-absolute top-3 end-3 btn custom-close" aria-label="Close" onClick={onClose}>
                    <IoMdClose size={20}/>
                </Button>
                <div className='w-100 d-flex flex-column align-items-center'>
                    <InputGroup className='w-75 d-fex mx-auto my-2 flex-column justify-content-center align-items-center'>
                        <span className='subtitle text-center mb-1'>{t('Scan a product barcode using your camera to find it quickly')}</span>
                        <Button className='mx-2 d-flex align-items-center rounded' onClick={() => setMobileToggleBarcodeModal(true)}>
                            <IoMdBarcode className='me-2' />
                            {t('Scan')}
                        </Button>

                    </InputGroup>
                    <Form.Label className='text-center subtitle mb-1'>{t('Can\'t scan? Enter the barcode manually')}</Form.Label>
                    <InputGroup className='d-flex flex-nowrap w-75'>
                        <Form.Control
                            value={code}
                            style={{textAlign: 'left'}}
                            className='w-100 input-with-length-numbers add-prod-input'
                            type='number'
                            maxLength={50}
                            onKeyPress={event => preventCharacters(event)}
                            onChange={(e) => setCode(e.target.value)}
                        />
                        <Form.Label className='position-absolute top-100 label-with-length-numbers subtitle text-right d-flex align-self-end' style={{fontSize: 10}}>
                            {code.length} / 50
                        </Form.Label>
                        <Button
                            className={'p-0'}
                            style={{width: 32}}
                            onClick={() => sendCode(code)}
                        >
                            <IoMdSearch/>
                        </Button>
                    </InputGroup>
                </div>

                <BarcodeScanner
                    show={toggleMobileBarcodeModal}
                    onHide={() => setMobileToggleBarcodeModal(false)}
                    onDetect={handleDetect}
                />
            </Modal.Header>
            {name ? <Modal.Body className="modal-styled-bg d-flex flex-column justify-content-center">
                <InputGroup className='my-2'>
                    <Form.Label column sm="2" className='subtitle mx-2 w-25'>
                        {t('Name')}
                    </Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        maxLength={100}
                        value={name}
                    />
                    <InputGroup.Text className='pe-none'>
                        <MdShoppingCart />
                    </InputGroup.Text>
                </InputGroup>
                <Image src={avatar} className='mx-auto mb-2' onLoad={() => console.log('loaded')}/>
            </Modal.Body> : null}
            <Modal.Footer className="d-flex justify-content-center modal-styled-bg">
                <Button
                    className={`d-flex align-items-center mx-2 ${name ? 'opacity-100' : 'opacity-50'}`}
                    disabled={!name}
                    onClick={addProductFromBarcode}
                >
                    <IoMdAdd className='me-2'/>
                    {t('Add')}
                </Button>
                <Button
                    className={`d-flex align-items-center mx-2`}
                    onClick={() => {
                        onClose();
                        setName('');
                        setAvatar(null);
                        setCode('');
                    }}
                >
                    {t('Close')}
                </Button>
            </Modal.Footer>
        </Modal>,
        document.body
    );
};


const mapStateToProps = (state) => ({
    list: state.items.list,
});

const mapDispatchToProps = {
    addProductToList,
};

export default connect(mapStateToProps, mapDispatchToProps)(BarcodeModal);
