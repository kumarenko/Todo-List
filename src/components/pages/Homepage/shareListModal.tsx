import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {Badge, Button, Container, Modal} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import {getColorById, validateEmail} from "../../../helpers/validator";
import {IoMdClose} from "react-icons/io";
import {inviteUsersRequest} from "../../../actions/shoppingLists";
import {connect, useSelector} from "react-redux";

const ShareListModal = ({list, show, onHide,currentUser, inviteUsersRequest}) => {
    const [email, setEmail] = useState('');
    const [owners, setOwners] = useState([]);
    const [waitingOwners, setWaitingOwners] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(()=> {
        let ownersArray = list.owners.filter(item => item.status !== 'WAIT');
        ownersArray.sort((a, b) => {
            if (a._id === currentUser.id) return -1;
            if (b._id === currentUser.id) return 1;
            return 0;
        });
        setOwners(ownersArray);
        setWaitingOwners(list.owners.filter(item => item.status === 'WAIT'));
    }, [list]);

    const invite = () => {
        validateEmail(email) ?
            setErrorMessage(validateEmail(email)) :
            inviteUsersRequest(list.listId, email, 'POST');
    }
    const removeInvite = (email) => {
        inviteUsersRequest(list.listId, email, 'DELETE');
    }
    const renderBadge = (user) => {
        if(list.creator._id === user._id) {
           return <Badge bg="secondary">Owner</Badge>
        }
        if(user.status === 'WAIT') {
            return <Badge bg="secondary">Pending</Badge>
        }
        else {
           return <Badge bg="secondary">Shared</Badge>
        }
    }


    const theme = useSelector(state => state.settings.theme);
    const buttonsVariant = theme === 'light' ? 'primary' : 'dark';

    return ReactDOM.createPortal(<Modal show={show} onHide={onHide} className='share-modal'>
        <Modal.Header closeButton>
            <Modal.Title>{list.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Container className='d-flex justify-content-between align-items-start'>
                <Form.Group className="mb-2 w-75">
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


                <Button className={'mx-2'} onClick={() => invite()} variant={buttonsVariant}>
                    Invite
                </Button>
            </Container>
            <Container className='d-flex justify-content-between flex-column'>
                {owners.length > 1 ?
                <>
                    <h3>List shared with {owners.length} {owners.length > 2 ? 'person' : 'people'}</h3>
                    <Container className=' flex-row items-center'>
                        {owners.map(user => <Container key={user._id} className='d-flex flex-nowrap justify-content-between'>
                            <div className='d-flex'>
                                <div className={'user-avatar -ml-2'}
                                     style={{
                                         backgroundColor: getColorById(user._id),
                                     }}>
                                    <div className='user-avatar-info'>
                                        {user.name ? user.name[0] : user.email[0]}
                                    </div>
                                </div>
                                <span className='mx-2'>
                                    {user.email}
                                    {currentUser.id === user._id && <Badge bg="secondary">You</Badge>}
                                </span>
                            </div>
                            <div>
                                {renderBadge(user)}
                                <Button
                                    className={'mx-2'}
                                    size="sm"
                                    variant="outline-secondary"
                                    onClick={() => removeInvite(user.email)}
                                    disabled={list.creator._id === user._id}>
                                    <IoMdClose />
                                </Button>
                            </div>
                        </Container>)}
                    </Container>
                </> : null}
                {waitingOwners.length ?
                <>
                    <h3>Invites sent to {waitingOwners.length} {waitingOwners.length > 1 ? 'person' : 'people'}</h3>
                    <Container className=' flex-row items-center'>
                        {waitingOwners.map(user => <Container key={user._id} className='d-flex flex-nowrap justify-content-between'>
                            <div className='d-flex'>
                                <div className={'user-avatar -ml-2'}
                                     style={{
                                         backgroundColor: getColorById(user._id),
                                     }}>
                                    <div className='user-avatar-info'>
                                        {user.name ? user.name[0] : user.email[0]}
                                    </div>
                                </div>
                                <span className='mx-2'>
                                    {user.email}
                                    {currentUser.id === user._id && <Badge bg="secondary">You</Badge>}
                                </span>
                            </div>
                            <div>
                                {renderBadge(user)}
                                <Button
                                    className={'mx-2'}
                                    size="sm"
                                    variant="outline-secondary"
                                    onClick={() => removeInvite(user.email)}
                                    disabled={list.creator._id === user._id}>
                                    <IoMdClose />
                                </Button>
                            </div>
                        </Container>)}
                    </Container>
                </> : null}
            </Container>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
    </Modal>, document.body);
};
const mapStateToProps = (state) => ({
    lists: state.items.lists,
    currentUser: state.user.user,
});
const mapDispatchToProps = {
    inviteUsersRequest
};

export default connect(mapStateToProps,mapDispatchToProps)(ShareListModal)
