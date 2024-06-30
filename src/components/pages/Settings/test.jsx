import React, { useEffect, useLayoutEffect, useRef } from 'react';
import Quagga from 'quagga';
import * as ReactDOM from "react-dom";

const BarcodeScanner = ({ onDetected }) => {
    const videoRef = useRef(null);

    useLayoutEffect(() => {
        const startCamera = async () => {
            let stream;
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                }

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

                Quagga.onDetected(onDetected);

            } catch (err) {
                console.error('Error accessing media devices:', err);
                alert('Ошибка при доступе к устройствам медиа: ' + err.message);
            }
        };

        if (videoRef.current) {
            startCamera();
        }

        return () => {
            console.log("Stopping Quagga and video stream");
            Quagga.offDetected(onDetected);
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
        <div style={{ position: 'fixed', left: 0, top: 200, width: '100%', height: '100%' }}>
            <video ref={videoRef} style={{ width: '100%', height: '100%' }} playsInline />
        </div>,
        document.body
    );
};

export default BarcodeScanner;
