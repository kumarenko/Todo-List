import React from 'react';
import {Card} from "react-bootstrap";
import './placeholders.less';

const ListPlaceholder = () => {
    return (
        <div className='lists w-100 px-3 my-2'>
            <Card className='placeholder-list w-100 d-flex flex-row align-items-stretch justify-content-between p-2 section-styled-bg overflow-hidden'>
                <div className=' position-relative w-75 z-1'>
                    <h5 className='placeholder-list-text w-50 rounded'/>
                    <div className='placeholder-list-progress rounded'/>
                </div>
                <div className="buttons d-flex align-items-center justify-content-around justify-content-sm-end  flex-column-reverse  flex-sm-row w-sm-25 w-auto z-1">
                    <div className='avatars-btn rounded-4 p-0 me-1 d-sm-block d-none'>
                        <div className="placeholder-list-button avatars"/>
                    </div>
                    <div className='placeholder-list-button extra rounded me-1'/>
                </div>
            </Card>
        </div>
    );
};

export default ListPlaceholder;