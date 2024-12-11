import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Button, Image, Modal } from 'react-bootstrap';
import { FiUpload, FiImage, FiTrash2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { removeProductAvatarRequest, updateProductAvatarRequest } from "../../../../actions/products";
import imageCompression from "browser-image-compression";
import { CLOUD_URL } from "../../../../configs/urls";
import { t } from "i18next";
import { removeUserAvatarRequest, updateUserAvatarRequest } from "../../../../actions/login";
import { IoMdClose } from "react-icons/io";

const AvatarModal = ({ isVisible, onClose, listId, type, product, onStartLoading = ()=> {} }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(product.avatar);
    const [item, setItem] = useState({});
    const dispatch = useDispatch();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            setSelectedFile(file);
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    };

    useEffect(() => {
        if(isVisible) {
            setPreview(product.avatar);
        }
    }, [isVisible]);
    useEffect(() => {
        if (!selectedFile) {
            setPreview(product.avatar);
        }
        setItem(product);
    }, [product]);

    useEffect(() => {
        const compressAndUploadImage = async () => {
            if (selectedFile) {
                try {
                    const maxFileSizeKB = 512;
                    const fileSizeKB = selectedFile.size / 1024;
                    onStartLoading();
                    const uploadFile = fileSizeKB > maxFileSizeKB
                        ? await imageCompression(selectedFile, {
                            maxSizeMB: maxFileSizeKB / 1024,
                            maxWidthOrHeight: 1024,
                            useWebWorker: true,
                        })
                        : selectedFile;

                    if (type === 'products') {
                        dispatch(updateProductAvatarRequest(listId, uploadFile, product._id, type));
                    } else {
                        dispatch(updateUserAvatarRequest(uploadFile, product._id));
                    }
                } catch (error) {
                    console.error('Error during image compression:', error);
                }
            }
        };

        compressAndUploadImage();
    }, [selectedFile]);

    const removeAvatar = async () => {
        const fileName = item.avatar.replace(CLOUD_URL, '').split('?')[0];
        onStartLoading();
        if (type === 'products') {
            await dispatch(removeProductAvatarRequest(listId, fileName, item._id));
        } else {
            await dispatch(removeUserAvatarRequest(fileName, item._id));
        }
        setPreview('');
    };

    const closeModal = () => {
        onClose();
        setSelectedFile(null);
    };

    return ReactDOM.createPortal(
        <Modal show={isVisible} onHide={closeModal} onExited={() => setPreview(null)} centered>
            <Modal.Header className="modal-styled-bg">
                <Modal.Title className="title text-break px-5">{item.name}</Modal.Title>
                <Button type="button" className="btn custom-close" aria-label="Close" onClick={closeModal}>
                    <IoMdClose size={20} />
                </Button>
            </Modal.Header>
            <Modal.Body className="d-flex flex-column justify-content-center align-items-center modal-styled-bg">
                {preview ? (
                    <Image src={preview} fluid />
                ) : (
                    <div className="d-flex align-items-center justify-content-center" style={{ width: 64, height: 64 }}>
                        <FiImage size={64} className="subtitle" />
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer className="modal-styled-bg d-flex justify-content-center">
                <label htmlFor="file-upload" className="custom-file-upload btn d-flex justify-content-center align-items-center">
                    <FiUpload className="mx-1" />
                    <span className="mx-1">{t('Upload')}</span>
                </label>
                <input type="file" id="file-upload" accept="image/png, image/jpeg" onChange={handleFileChange} />
                {preview && (
                    <Button className="mx-2" onClick={removeAvatar}>
                        <FiTrash2 className="mx-1" />
                        <span className="mx-1">{t('Delete')}</span>
                    </Button>
                )}
            </Modal.Footer>
        </Modal>,
        document.body
    );
};

export default AvatarModal;
