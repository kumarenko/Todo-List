import React, {useEffect, useState} from 'react';
import {logoutAction, updateProfileInfo, allowEmailSendingRequest} from "../../../actions/login";
import {connect} from "react-redux";
import {Button, Container, Form, Image} from "react-bootstrap";
import {User} from "../../../types/types";
import ChangePassword from "./changePassword";
import './styles.less';
import {t} from "i18next";
import Footer from "../../../common/footer";
import AvatarModal from "../Homepage/listPage/avatar";
import { FaCamera } from "react-icons/fa";
import Spinner from "../../../common/spinner";
import {FcGoogle} from "react-icons/fc";

interface ProfileInterface extends User {
    logoutAction: (role: boolean) => void,
    UpdateProfileInfo: () => void,
    title: string;
}
const Profile = ({user, logoutAction, title,updateProfileInfo, allowEmailSendingRequest }:ProfileInterface) => {
    const userData = user.user;
    const [name, setName] = useState(userData.name);
    const [lastName, setLastName] = useState(userData.lastName);
    const [email, setEmail] = useState(userData.email);
    const [isEditing, setIsEditing] = useState(false);
    const [toggleAvatarModal, setToggleAvatarModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingAvatar, setLoadingAvatar] = useState(false);
    useEffect(() => {
        document.title = title;
    }, []);

    async function handleProfileData() {
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
            setLoading(true);
            if(Object.keys(updatedData).length) {
                await updateProfileInfo(userData.id, updatedData);
            }
            setLoading(false);
            setIsEditing(false);
        } else {
            setIsEditing(true);
        }
    }

    const resetProfileData = () => {
        setName(userData.name);
        setLastName(userData.lastName);
        setEmail(userData.email);
        setIsEditing(false);
    }
    const toggleEmailSending = (e) => {
        allowEmailSendingRequest(user.user.id, e.target.checked);
    }
    useEffect(() => {
        setLoadingAvatar(false);
    }, [user.user.avatar])
    return (
        <div className='profile content d-flex flex-column align-items-center mx-auto my-0 pb-5 h-100'>
            {loading ? <Spinner/> : null}
            <div className="d-flex justify-content-between h3 w-100 p-3 align-items-center justify-content-between flex-column flex-sm-row">
                <h1 className='title'>{t('Profile')}</h1>
                <Button size={'md'} onClick={() => logoutAction(user.user.role)}>{user.user.role === 'USER' ? t('Logout') : t('Login')}</Button>
            </div>
            {userData.role === 'USER' ?
                <>
                    <div onClick={() => setToggleAvatarModal(true)} className='position-relative d-flex justify-content-center w-100 px-3 py-1'>
                        <div className='position-relative'>
                            {user.user.avatar ?
                                <div className='avatar mb-1 rounded-circle section-styled-bg d-flex align-items-center justify-content-center position-relative'>
                                    <Image src={user.user.avatar} className={`avatar mb-1 section-styled-bg`}/>
                                    {loadingAvatar ? <div style={{backgroundColor: 'rgba(0, 0, 0, 0.25)'}}
                                                          className='position-absolute w-100 h-100 d-flex align-items-center justify-content-center'>
                                        <div className="spinner-border text-primary"/>
                                    </div> : null}
                                </div> :
                                <div className='avatar mb-1 rounded-circle section-styled-bg d-flex align-items-center justify-content-center'>
                                    <FaCamera size={48} className={'subtitle'} />
                                </div>}
                        </div>
                    </div>
                    <Container fluid="md" className='user-info d-flex w-100 flex-wrap mb-2 px-3 py-1 justify-content-center'>
                       <div className='w-50'>
                           <div className=''>
                               <h5 className='title mb-1 mt-2'>{t('Name')}</h5>
                               {isEditing ? <Form.Control
                                   maxLength={20}
                                   onChange={e => setName(e.target.value)} type="text" value={name}/> : <div className={'subtitle'}>{userData.name}</div>}
                           </div>
                           <div className=''>
                               <h5 className='title mb-1 mt-2'>{t('Email')}</h5>
                               {isEditing ? <Form.Control
                                       onChange={e => setEmail(e.target.value)}
                                       disabled value={email}
                                       type="text"/> :
                                   <div className='subtitle position-relative'>
                                       {user.user.googleId ? <FcGoogle className='me-1'/> : null}
                                       {userData.email}
                                   </div>}
                           </div>
                       </div>
                    </Container>
                    <div className='d-flex justify-content-center w-100 controls px-3 py-1'>
                        <Button
                            onClick={() => {
                                handleProfileData();
                            }}
                            size="md"
                            disabled={isEditing && name.length === 0}
                            className='me-1'>
                            {isEditing ? t('Save') : t('Edit')}
                        </Button>
                        {isEditing && <Button className='ms-1' onClick={() => resetProfileData()} size="md">{t('Cancel')}</Button>}
                    </div>
                    <div className="d-flex align-items-center px-3 my-2">
                        <Form.Label className='title mb-0'>{t('Email notifications about being added to a list')}</Form.Label>
                        <Form.Check
                            type={'checkbox'}
                            className='prod-checkbox mx-3'
                            defaultChecked={user.user.allowEmails}
                            onChange={(e) => toggleEmailSending(e)}
                        />
                    </div>
                    <ChangePassword setLoading={(state) => setLoading(state)} userId={userData.id} googleId={user.user.googleId}/>
                    <AvatarModal
                        isVisible={toggleAvatarModal}
                        onClose={() => setToggleAvatarModal(false)}
                        product={{_id: user.user.id, name: user.user.name, avatar: user.user.avatar}}
                        onStartLoading={() => setLoadingAvatar(true)}
                        listId={null}
                        type={'avatars'}
                    />
                </> :
                <div className="w-100 px-3 py-1">
                    <h4 className='title'>{t("Hello! You're in guest mode. Sign in to access all features!")}</h4>
                </div>
            }
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
    allowEmailSendingRequest,
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
