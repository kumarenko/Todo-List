import React, { useState, useLayoutEffect, useRef } from 'react';
import Quagga from 'quagga';
import * as ReactDOM from "react-dom";
import './styles.less';
import {Form} from "react-bootstrap";

const BarcodeScanner = ({ onDetected, onClose }) => {
    const videoRef = useRef(null);
    const [detectedCode, setDetectedCode] = useState(null);
    const [manualEntering, setManualEntering] = useState(false);
    const [manualCode, setManualCode] = useState('');

    useLayoutEffect(() => {
        const startCamera = async () => {
            let stream;
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.addEventListener('loadedmetadata', () => {
                        videoRef.current.play();
                    });

                Quagga.init({
                    inputStream: {
                        name: "Live",
                        type: "LiveStream",
                        target: videoRef.current,
                        constraints: {
                            facingMode: "environment"
                        }
                    },
                    decoder: {
                        readers: ["code_128_reader", "ean_reader", "ean_8_reader", "code_39_reader", "code_39_vin_reader", "codabar_reader", "upc_reader", "upc_e_reader", "i2of5_reader"]
                    },
                }, (err) => {
                    if (err) {
                        console.error('Error initializing Quagga:', err);
                        return;
                    }
                    console.log("Initialization finished. Ready to start");
                    Quagga.start();
                });

                    Quagga.onDetected(handleDetected);
                }
            } catch (err) {
                console.error('Error accessing media devices:', err);
                alert('Ошибка при доступе к устройствам медиа: ' + err.message);
            }
        };

        const handleDetected = (data) => {
            setDetectedCode(data.codeResult.code);
            if (onDetected) {
                onDetected(data.codeResult.code);
            }
        };

        if (videoRef.current) {
            startCamera();
        }

        return () => {
            console.log("Stopping Quagga and video stream");
            Quagga.offDetected(handleDetected);
            Quagga.stop();
            if (videoRef.current && videoRef.current.srcObject) {
                let stream = videoRef.current.srcObject;
                let tracks = stream.getTracks();
                tracks.forEach(track => {
                    track.stop();
                    console.log(`Stopped track: ${track.kind}`);
                });
                videoRef.current.srcObject = null;
                console.log("Video stream stopped");
            }
        };
    }, [onDetected]);

    return ReactDOM.createPortal(
        <div className='barcode d-flex flex-column justify-content-center align-items-centers'>
            <div className='d-flex justify-content-end m-2'>
                <button onClick={onClose}>
                    Cancel
                </button>
            </div>
            <h3 className='text-center'>Please scan barcode with your camera</h3>
            <video ref={videoRef} style={{ width: '100%', height: 'auto', aspectRatio: '16/9' }} playsInline />

            {detectedCode && !manualEntering && (
                <p className='text-center m-2'>Detected code: {detectedCode}</p>
            )}
            <div className='text-center'>
                <button className='button-as-link my-2' onClick={() => setManualEntering(!manualEntering)}>Enter manually</button>
            </div>
            {manualEntering &&
            <div className='text-center'>
                <Form.Control className='search mx-auto my-2' type="text" value={manualCode} onChange={(e) => setManualCode(e.target.value)}/>
                <button className='my-1'
                    onClick={() => {
                    setDetectedCode(manualCode);
                    onDetected(manualCode);
                }}>Search</button>
            </div>}
        </div>,
        document.getElementById('root')
    );
};

export default BarcodeScanner;
