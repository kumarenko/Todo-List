import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {Button, Form, Image, InputGroup, Modal} from "react-bootstrap";
import {t} from "i18next";
import {IoMdAdd, IoMdClose, IoMdSearch} from "react-icons/io";
import {addProductToList, findProductByBarcode} from "../../../../actions/products";
import {connect, useDispatch} from "react-redux";
import {MdShoppingCart} from "react-icons/md";
import {addMessageToQueue} from "../../../../redux/settingsReducer";
import {preventCharacters} from "../../../../helpers/helper";
const customProductsUnits = ['pcs', 'g', 'kg', 'oz', 'lb', 'ml', 'l', 'gal'];

const BarcodeModal = ({list, isVisible, onClose, addProductToList}) => {
    const dispatch = useDispatch();
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState(null);

    const elemInList = list.products.find(elem => elem.name === name);

    useEffect(() => {
        if(name) {

        }
    }, [list.products]);
    const sendCode = async () => {
        if(code.trim()) {
            const res = await findProductByBarcode(code.trim());
            if(res.ok) {
                const prod = await res.json();
                console.log('prod', prod);
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
            console.log('PROD', prod, name);
            await addProductToList(list._id, prod);
            dispatch(addMessageToQueue({message: t('Product successfully added to the list'), type: 'success'}));

        } else {
            dispatch(addMessageToQueue({message: t('Product already added to the list'), type: 'success'}));
        }
    }
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
                <InputGroup className='w-75 d-fex mx-3 my-2'>
                    <Form.Control
                        value={code}
                        style={{textAlign: 'left'}}
                        className='input-with-length-numbers add-prod-input'
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
                        onClick={() => sendCode()}
                    ><IoMdSearch /></Button>
                </InputGroup>
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
