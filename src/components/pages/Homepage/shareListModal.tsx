import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {Badge, Button, Container, Modal} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import {getColorById, validateEmail} from "../../../helpers/validator";
import {IoMdClose} from "react-icons/io";
import {inviteUsersRequest} from "../../../actions/shoppingLists";
import {connect} from "react-redux";
import {copyTextToClipboard} from "../../../helpers/helper";
import CustomAlert from "../../../common/Alert";

const ShareListModal = ({list, show, onHide, user, inviteUsersRequest}) => {
    const [email, setEmail] = useState('');
    const [owners, setOwners] = useState([]);
    const [message, setMessage] = useState('');
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
        validateEmail(email) ?
            setErrorMessage(validateEmail(email)) :
            inviteUsersRequest(list._id, user.id, email, 'POST');
    }
    const copyList = () => {
        let str = `${list.name.value}\n`;
        list.products.forEach(prod => {
            const prodStr = `${prod.name} ${prod.count > 2 ? ` (${prod.count} pcs)` : ''}`
            if(prod.checked) {
                str = str + `• ${prodStr.split('').map(char => char + '\u0336').join('')}\n`
            } else {
                str = str + `• ${prod.name}\n`
            }
        });
        copyTextToClipboard(str)
            .then(result => {
                if (result === 'success') {
                    setMessage('List copied to clipboard');
                }
            })
            .catch(error => {
                setMessage(`Error copying to clipboard: ${error}`);
            });
        setTimeout(() => setMessage(''), 2500);
    }
    const removeInvite = (email) => {
        inviteUsersRequest(list._id, user.id, email, 'DELETE');
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

    return ReactDOM.createPortal(<Modal show={show} onHide={onHide} className='share-modal' centered>
        <Modal.Header className='modal-styled-bg justify-content-center'>
            <Modal.Title>{list.name.value}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-styled-bg justify-content-center'>
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


                <Button className={'mx-2'} onClick={() => invite()}>
                    Invite
                </Button>
                <Button className={'mx-2'} onClick={() => copyList()}>
                    Copy
                </Button>
            </Container>
            <Container className='d-flex justify-content-between flex-column'>
                {owners.length > 1 ?
                <>
                    <h3>List shared with {owners.length - 1} {owners.length > 2 ? 'person' : 'people'}</h3>
                    <Container className=' flex-row items-center'>
                        {owners.map(owner => <Container key={owner._id} className='d-flex flex-nowrap justify-content-between'>
                            <div className='d-flex'>
                                <div className={'user-avatar -ml-2'}
                                     style={{
                                         backgroundColor: getColorById(owner._id),
                                     }}>
                                    <div className='user-avatar-info'>
                                        {owner.name ? owner.name[0] : owner.email[0]}
                                    </div>
                                </div>
                                <span className='mx-2'>
                                    <span className='subtitle'>{owner.email}</span>
                                    {user.id === owner._id && <Badge bg="secondary ms-1">You</Badge>}
                                </span>
                            </div>
                            {list.creator !== owner._id && <div>
                                {renderBadge(owner)}
                                <Button
                                    className={'mx-2'}
                                    size="sm"
                                    onClick={() => removeInvite(owner.email)}>
                                    <IoMdClose/>
                                </Button>
                            </div>}
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
                        </Container>)}
                    </Container>
                </> : null}
            </Container>
        </Modal.Body>
        <Modal.Footer className='modal-styled-bg empty-footer'/>
        {message ? <CustomAlert className='popup'>
            {message}
        </CustomAlert> : null}
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
