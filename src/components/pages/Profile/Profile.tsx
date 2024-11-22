import React, {useEffect, useState} from 'react';
import {logoutAction, updateProfileInfo} from "../../../actions/login";
import {connect, useDispatch} from "react-redux";
import {Button, Container, Form, Image} from "react-bootstrap";
import {User} from "../../../types/types";
import {updateProfileErrorMessage, updateProfileSuccessMessage} from "../../../redux/userReducer";
import CustomAlert from "../../../common/Alert";
import ChangePassword from "./changePassword";
import './styles.less';
import {t} from "i18next";
import Footer from "../../../common/footer";

interface ProfileInterface extends User {
    logoutAction: (role: boolean) => void,
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
        <div className='profile content d-flex flex-column align-items-center mx-auto my-0 pb-5'>
            <div className="d-flex justify-content-between h3 w-100 p-3 align-items-center justify-content-between flex-column flex-sm-row">
                <h1 className='title'>{t('Profile')}</h1>
                <Button size={'md'} onClick={() => logoutAction(user.user.role)}>{user.user.role === 'USER' ? t('Logout') : t('Login')}</Button>
            </div>
            {userData.role === 'USER' ?
                <>
                    <div className='d-flex justify-content-center w-100 px-3 py-1'>
                        <Image src={user.user.avatar} roundedCircle className='avatar mb-1'/>
                    </div>
                    <Container fluid="md" className='user-info d-flex w-100 flex-wrap mb-2 px-3 py-1 justify-content-center'>
                        <div className='mx-2'>
                            <h5 className='title'>{t('Name')}</h5>
                            {isEditing ? <Form.Control
                                onChange={e => setName(e.target.value)} type="text" value={name}/> : <div className={'subtitle'}>{userData.name}</div>}
                        </div>
                        <div className='mx-2'>
                            <h5 className='title'>{t('Email')}</h5>
                            {isEditing ? <Form.Control
                                    onChange={e => setEmail(e.target.value)}
                                    disabled value={email}
                                    type="text"/> :
                                <div className='subtitle'>{userData.email}</div>}
                        </div>
                    </Container>
                </> :
                <div className="w-100 px-3 py-1">
                    <h4 className='title'>{t("Hello! You're in guest mode. Sign in to access all features!")}</h4>
                </div>
            }
            <div className='d-flex justify-content-center w-100 controls px-3 py-1'>
                <Button onClick={() => {
                    handleProfileData();
                }} size="md" className='me-1'>{isEditing ? t('Save') : t('Edit')}</Button>
                {isEditing && <Button className='ms-1' onClick={() => resetProfileData()} size="md">{t('Cancel')}</Button>}
            </div>
            <ChangePassword userId={userData.id} googleId={user.user.googleId}/>
            <CustomAlert variant={user.errorMessage ? 'danger' : 'success'} className='popup'>
                {message}
            </CustomAlert>
            <Footer/>
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
