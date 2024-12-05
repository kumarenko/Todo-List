import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {Badge, Button, Container, Modal} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import {getColorById, validateEmail} from "../../../helpers/validator";
import {IoMdClose} from "react-icons/io";
import {inviteUsersRequest} from "../../../actions/shoppingLists";
import {connect} from "react-redux";
import {t} from "i18next";
import CustomMessage from "../../../common/customMessage";

const ShareListModal = ({list, show, onHide, user, inviteUsersRequest}) => {
    const [email, setEmail] = useState('');
    const [owners, setOwners] = useState([]);
    const [waitingOwners, setWaitingOwners] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(()=> {
        let ownersArray = list.userOwners.filter(item => item.status !== 'WAIT');
        ownersArray.sort((a, b) => {
            if (a._id === user.id) return -1;
            if (b._id === user.id) return 1;
            return 0;
        });
        setOwners(ownersArray);
        setWaitingOwners(list.userOwners.filter(item => item.status === 'WAIT'));
    }, [list]);

    const invite = () => {
        if(validateEmail(email)){
            setErrorMessage(validateEmail(email))
        } else {
            inviteUsersRequest(list._id, user.id, email, 'POST')
        }
    }

    const removeInvite = (email) => {
        inviteUsersRequest(list._id, user.id, email, 'DELETE');
    }
    const renderBadge = (user) => {
        if(list.creator._id === user._id) {
           return <Badge bg="secondary">{t('Owner')}</Badge>
        }
        if(user.status === 'WAIT') {
            return <Badge bg="secondary">{t('Waiting')}</Badge>
        }
        else {
           return <Badge bg="secondary">{t('Shared')}</Badge>
        }
    }

    const renderCreator = () => {
        const creator = list.userOwners.find(owner => owner._id === list.creator);
        if(creator) {
            return <div className='flex-row items-center'>
                <div className='d-flex'>
                    <div className={'user-avatar ml-2'}
                         style={{
                             backgroundColor: getColorById(list.creator),
                         }}>
                        {creator.avatar ? <div className='user-avatar-info'>
                            <img src={creator.avatar} alt=""/>
                        </div> : <div className='user-avatar-info'>
                            {creator.name ? creator.name[0] : creator.email[0]}
                        </div>}
                    </div>
                    <span className='mx-2'>
                    <span className='subtitle'>{creator.name} </span>
                    <span className='subtitle'> ({creator.email})</span>
                        {user.id === creator._id ? <span className='subtitle'> ({t('You')})</span> : null}
                </span>
                </div>
            </div>
        }
    }
    const renderOwners = (userOwners) => {
        const ownersWithoutCreator = userOwners.filter(user => user._id !== list.creator && user.status !== 'WAIT');
        return ownersWithoutCreator.map(owner => (
            <div key={owner._id} className='d-flex flex-nowrap justify-content-between mb-2'>
                <div className='d-flex'>
                    <div
                        className={'user-avatar ml-2'}
                        style={{
                            backgroundColor: getColorById(owner._id),
                        }}
                    >
                        {owner.avatar ? (
                            <div className='user-avatar-info'>
                                <img
                                    src={owner.avatar}
                                    alt=''
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'block';
                                    }}
                                />
                                <div style={{ display: 'none' }} className='user-avatar-info subtitle'>
                                    {owner.name[0]}
                                </div>
                            </div>
                        ) : (
                            <div className='user-avatar-info subtitle'>
                                {owner.name[0]}
                            </div>
                        )}
                    </div>
                    <span className='mx-2 d-flex flex-column flex-sm-row'>
                        <span className='subtitle text-break'>{owner.name} </span>
                        <span className='subtitle text-break'> ({owner.email})</span>
                            {user.id === owner._id && <Badge bg="secondary ms-1">{t('You')}</Badge>}
                    </span>
                </div>
                {list.creator !== owner._id && (
                    <div className='d-flex align-items-center'>
                        {renderBadge(owner)}
                        <Button
                            className={'mx-2'}
                            size="sm"
                            onClick={() => removeInvite(owner.email)}
                        >
                            <IoMdClose/>
                        </Button>
                    </div>
                )}
            </div>
        ));
    };

    return ReactDOM.createPortal(<Modal show={show} onHide={onHide} className='share-modal' centered>
        <Modal.Header className='modal-styled-bg justify-content-center'>
            <Modal.Title className='title'>{t('Invite Friends to List')}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-styled-bg justify-content-center'>
            <Container className='d-flex justify-content-between align-items-start'>
                <Form.Group className="mb-2 w-100 me-2">
                    <Form.Control
                        type="email"
                        id="name"
                        isInvalid={errorMessage.length}
                        placeholder={'example@gmail.com'}
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setErrorMessage('');
                        }}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errorMessage}
                    </Form.Control.Feedback>
                </Form.Group>


                <Button className={'mx-2'} onClick={() => invite()}>
                    {t('Invite')}
                </Button>
            </Container>
            <Container className='d-flex justify-content-between flex-column'>
                <h3 className='title'>{t('Creator')}</h3>
                {renderCreator()}
                {owners.length > 1 ?
                <>
                    <h3 className='title'>{owners.length > 2 ?
                        t(`List shared with people`, {count: owners.length - 1}) :
                        t('List shared with 1 person')}</h3>
                    <div className='flex-row items-center'>
                        {renderOwners(list.userOwners)}
                    </div>
                </> : null}
                {waitingOwners.length ?
                <>
                    <h3 className='title'>{waitingOwners.length > 1 ?
                        t(`Invites sent to people`, {count: waitingOwners.length}) :
                        t('Invite sent to 1 person')}</h3>
                    <div className=' flex-row items-center'>
                        {waitingOwners.map(user => <div key={user._id} className='d-flex flex-nowrap justify-content-between mb-2'>
                            <div className='d-flex'>
                                <span className='mx-2'>
                                    <span className='subtitle'>{user.email}</span>
                                </span>
                            </div>
                            <div>
                                {renderBadge(user)}
                                <Button
                                    className={'mx-2'}
                                    size="sm"
                                    onClick={() => removeInvite(user.email)}
                                    disabled={list.creator._id === user._id}>
                                    <IoMdClose />
                                </Button>
                            </div>
                        </div>)}
                    </div>
                </> : null}
            </Container>
        </Modal.Body>
        <Modal.Footer className='modal-styled-bg empty-footer'/>
        <CustomMessage/>
    </Modal>, document.body);
};
const mapStateToProps = (state) => ({
    lists: state.items.lists,
    list: state.items.list,
    user: state.user.user,
});
const mapDispatchToProps = {
    inviteUsersRequest
};

export default connect(mapStateToProps,mapDispatchToProps)(ShareListModal)
