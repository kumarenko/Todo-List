import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import { Button, Image, Modal } from 'react-bootstrap';
import { FiUpload, FiImage, FiTrash2 } from "react-icons/fi";
import {useDispatch} from "react-redux";
import {removeProductAvatarRequest, updateProductAvatarRequest} from "../../../../actions/products";
import imageCompression from "browser-image-compression";
import {CLOUD_URL} from "../../../../configs/urls";
import {t} from "i18next";
import {removeUserAvatarRequest, updateUserAvatarRequest} from "../../../../actions/login";

const AvatarModal = ({ isVisible, onClose, listId, type, product }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState('');
    const [item, setItem] = useState({});
    const dispatch = useDispatch();
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        setPreview(product.avatar);
        setItem(product);
    }, [product]);

    useEffect(() => {
        const compressAndUploadImage = async () => {
            if (selectedFile) {
                try {
                    const maxFileSizeKB = 512;
                    const fileSizeKB = selectedFile.size / 1024;

                    if (fileSizeKB > maxFileSizeKB) {
                        const options = {
                            maxSizeMB: maxFileSizeKB / 1024,
                            maxWidthOrHeight: 1024,
                            useWebWorker: true,
                        };
                        const compressedFile = await imageCompression(selectedFile, options);
                        const compressedFileAsFile = new File([compressedFile], selectedFile.name, {
                            type: compressedFile.type,
                        });
                        if(type === 'products') {
                            dispatch(updateProductAvatarRequest(listId, compressedFileAsFile, product._id, type));
                        } else {
                            dispatch(updateUserAvatarRequest(compressedFileAsFile, product._id));
                        }
                    } else {
                        if(type === 'products') {
                            dispatch(updateProductAvatarRequest(listId, selectedFile, product._id, type));
                        } else {
                            dispatch(updateUserAvatarRequest(selectedFile, product._id));
                        }
                    }
                } catch (error) {
                    console.error('Error during image compression:', error);
                }
            }
        };

        compressAndUploadImage();
    }, [selectedFile]);

    const removeAvatar = async () => {
        const fileName = item.avatar.replace(CLOUD_URL, '').split(('?'))[0];
        if(type === 'products') {
            await dispatch(removeProductAvatarRequest(listId, fileName, item._id));
        } else {
            await dispatch(removeUserAvatarRequest(fileName, item._id));
        }
       setPreview('');
    }
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
                        {t('Upload')}
                    </span>
                </label>
                <input type="file" id='file-upload' accept='image/png, image/jpeg' onChange={handleFileChange} />
                {preview ? <Button className='mx-2' onClick={removeAvatar}>
                    <FiTrash2 className='mx-1' />
                    <span className='mx-1'>{t('Delete')}</span>
                </Button> : null}

            </Modal.Footer>
        </Modal>,
        document.body
    );
};

export default AvatarModal;
