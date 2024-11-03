import React, {useEffect, useState} from 'react';
import {logoutAction, updateProfileInfo} from "../../../actions/login";
import {connect, useDispatch, useSelector} from "react-redux";
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
    const theme = useSelector(state => state.settings.theme);
    const buttonsVariant = theme === 'light' ? 'primary' : 'dark';
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
            console.log(user);
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
                <h1>Profile page</h1>
                <Button variant={buttonsVariant} size={'md'} onClick={() => logoutAction()}>Logout</Button>

            </div>
            {userData.role === 'USER' ?
                <Container fluid="md" className='user-info d-flex w-75 flex-wrap mb-2'>
                    {user.user.googleId ? <div>
                        <Image src={user.user.avatar} roundedCircle/>
                    </div> : null}
                    <div>
                        <div>Name</div>
                        {isEditing ? <Form.Control
                            onChange={e => setName(e.target.value)} type="text" value={name}/> : <div>{userData.name}</div>}
                    </div>
                    <div>
                        <div>Last Name</div>
                        {isEditing ? <Form.Control
                            onChange={e => setLastName(e.target.value)} type="text" value={lastName}/> : <div>{userData.lastName}</div>}
                    </div>
                    <div>
                        <div>Email</div>
                        {isEditing ? <Form.Control
                            onChange={e => setEmail(e.target.value)}
                            disabled value={email}
                            type="text"/> :
                            <div>{userData.email}</div>}
                    </div>
                </Container>:
                <div className="w-75">
                    You are in guest mode now.
                </div>
            }
            <ChangePassword userId={userData.id} googleId={user.user.googleId}/>
            <div className='w-75 controls'>
                <Button variant={buttonsVariant} onClick={() => {
                    handleProfileData();
                }} size="md">{isEditing ? 'Save' : 'Edit'}</Button>
                {isEditing && <Button variant={buttonsVariant} onClick={() => resetProfileData()} size="md">Cancel</Button>}
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
