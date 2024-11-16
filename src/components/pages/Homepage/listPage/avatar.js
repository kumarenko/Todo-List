import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import { Button, Image, Modal } from 'react-bootstrap';
import { FiUpload, FiImage} from "react-icons/fi";
import {useDispatch} from "react-redux";
import {updateProductAvatarRequest} from "../../../../actions/products";
const AvatarModal = ({ isVisible, onClose, item, listId, type }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(item.avatar || '');
    const dispatch = useDispatch();
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleUpload = () => {
        console.log('selectedFile', selectedFile);
        if (selectedFile) {
            dispatch(updateProductAvatarRequest(listId,selectedFile, item, type));
        }
    };

    useEffect(() => {

        console.log('selectedFile', selectedFile);
        handleUpload();
    }, [selectedFile]);
    const closeModal = () => {
        onClose();
        setSelectedFile(null);
        setPreview('');
    }

    return ReactDOM.createPortal(
        <Modal show={isVisible} onHide={closeModal} centered>
            <Modal.Header closeButton className='modal-styled-bg'>
                <Modal.Title className='title'>{item.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex flex-column justify-content-center align-items-center modal-styled-bg">
                {preview ? <Image src={preview} fluid /> : <div className='d-flex align-items-center justify-content-center' style={{width: 64, height: 64}}>
                    <FiImage size={64} className='subtitle'/>
                </div>}

            </Modal.Body>
            <Modal.Footer className='modal-styled-bg d-flex justify-content-center'>
                <label htmlFor="file-upload" className="custom-file-upload btn d-flex justify-content-center align-items-center">
                    <FiUpload className='mx-1' />
                    <span className='mx-1'>
                        Upload
                    </span>
                </label>
                <input type="file" id='file-upload' accept='image/png, image/jpeg' onChange={handleFileChange} />
                <Button className='mx-2' onClick={closeModal}>
                    <span className='mx-1'>Close</span>
                </Button>
            </Modal.Footer>
        </Modal>,
        document.body
    );
};

export default AvatarModal;
