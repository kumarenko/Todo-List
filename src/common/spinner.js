import React from 'react';

const Spinner = () => {
    return (
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ zIndex: 1050 }}>
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark" style={{ opacity: 0.25 }}/>
            <div className="position-absolute top-50 start-50 translate-middle d-flex align-items-center justify-content-center">
                <div className="spinner-border text-primary" role="status"/>
            </div>
        </div>
    );
};

export default Spinner;