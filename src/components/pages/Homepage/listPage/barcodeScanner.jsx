import React from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import {Button, Modal} from "react-bootstrap";
import {IoMdClose} from "react-icons/io";

const BarcodeScanner = ({ show, onHide, onDetect }) => {
    return (
        <Modal show={show}
               centered
               onHide={() => {
            onHide();
        }}>
            <Modal.Header className='modal-styled-bg'>
                <Modal.Title className='title'>
                    Scan a Product Barcode
                </Modal.Title>
                <Button type="button" className="position-absolute top-3 end-3 btn custom-close" aria-label="Close" onClick={onHide}>
                    <IoMdClose size={20}/>
                </Button>
            </Modal.Header>
            <Modal.Body className='modal-styled-bg'>
                <div className="video-wrapper">
                    <BarcodeScannerComponent
                        onUpdate={(err, result) => {
                            if (result) {
                                onDetect(result.text);
                                onHide();
                            }
                        }}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer className='empty-footer modal-styled-bg'/>
        </Modal>
    );
};

export default BarcodeScanner;
