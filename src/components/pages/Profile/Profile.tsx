import React, {useEffect, useState} from 'react';
import {logoutAction, updateProfileInfo} from "../../../actions/login";
import {connect, useDispatch} from "react-redux";
import {Button, Container, Form, Image} from "react-bootstrap";
import {User} from "../../../types/types";
import {updateProfileErrorMessage, updateProfileSuccessMessage} from "../../../redux/userReducer";
import CustomAlert from "../../../common/Alert";
import ChangePassword from "./changePassword";
import './styles.less';

interface ProfileInterface extends User {
    logoutAction: () => void,
    UpdateProfileInfo: () => void,
    title: string;
}
const Profile = ({user, logoutAction, title,updateProfileInfo, }:ProfileInterface) => {
    const userData = user.user;
    const dispatch = useDispatch();
    const [name, setName] = useState(userData.name);
    const [lastName, setLastName] = useState(userData.lastName);
    const [email, setEmail] = useState(userData.email);
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState('');
    useEffect(() => {
        document.title = title;
    }, []);

    function handleProfileData() {
        if(isEditing) {
            let updatedData = {};
            if (userData.name !== name) {
                updatedData = {...updatedData, name};
            }
            if (userData.lastName !== lastName) {
                updatedData = {...updatedData, lastName};
            }
            if (userData.email !== email) {
                updatedData = {...updatedData, email};
            }
            updateProfileInfo(userData.id, updatedData);
            setIsEditing(false);
        } else {
            setIsEditing(true);
        }
    }
    useEffect(() => {
        if(user.successMessage) {
            setMessage(user.successMessage);
            setTimeout(() => {
                dispatch(updateProfileSuccessMessage(''));
                setMessage('');
            }, 2500)
        }
        if(user.errorMessage) {
            setMessage(user.errorMessage);
            setTimeout(() => {
                dispatch(updateProfileErrorMessage(''));
                setMessage('');
            }, 2500)
        }
        console.log('???', user.user.googleId);
    }, [user]);
    const resetProfileData = () => {
        setName(userData.name);
        setLastName(userData.lastName);
        setEmail(userData.email);
        setIsEditing(false);
    }

    return (
        <div className='profile d-flex flex-column align-items-center'>
            <div className="d-flex justify-content-between h3 w-75 p-3">
                <h1 className='title'>Profile page</h1>
                <Button size={'md'} onClick={() => logoutAction()}>Logout</Button>

            </div>
            {userData.role === 'USER' ?
                <>
                    <div>
                        <Image src={user.user.avatar} roundedCircle className='avatar mb-1'/>
                    </div>
                    <Container fluid="md" className='user-info d-flex w-75 flex-wrap mb-2'>
                        <div>
                            <h5 className='title'>Name</h5>
                            {isEditing ? <Form.Control
                                onChange={e => setName(e.target.value)} type="text" value={name}/> : <div className={'subtitle'}>{userData.name}</div>}
                        </div>
                        <div>
                            <h5 className='title'>Email</h5>
                            {isEditing ? <Form.Control
                                    onChange={e => setEmail(e.target.value)}
                                    disabled value={email}
                                    type="text"/> :
                                <div className='subtitle'>{userData.email}</div>}
                        </div>
                    </Container>
                </> :
                <div className="w-75">
                    <h4 className='title'>You are in guest mode now.</h4>
                </div>
            }
            <ChangePassword userId={userData.id} googleId={user.user.googleId}/>
            <div className='w-75 controls'>
                <Button onClick={() => {
                    handleProfileData();
                }} size="md">{isEditing ? 'Save' : 'Edit'}</Button>
                {isEditing && <Button onClick={() => resetProfileData()} size="md">Cancel</Button>}
            </div>
            <CustomAlert variant={user.errorMessage ? 'danger' : 'success'} className='popup'>
                {message}
            </CustomAlert>
        </div>
    );
};

const mapStateToProps = (state) => ({
    user: state.user
});

const mapDispatchToProps = {
    updateProfileInfo,
    logoutAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
