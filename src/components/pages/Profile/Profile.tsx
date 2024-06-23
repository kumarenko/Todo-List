import React, {useEffect} from 'react';
import {logoutAction, setUserData, signInAction, signUpAction} from "../../../actions/login";
import {connect} from "react-redux";
import {Button} from "react-bootstrap";

const Profile = ({user, logoutAction, title}) => {
    const userData = user.user;
    useEffect(() => {
        document.title = title
    }, []);
    return (
        <div>
            Profile page
            {userData.role === 'USER' ? <div className="">
                <div>{userData.email}</div>
                <div>{userData.name}</div>
                <div>{userData.lastName}</div>
            </div> : <div className="">

            </div>}
            <Button onClick={() => logoutAction()}>Logout</Button>
        </div>
    );
};

const mapStateToProps = (state) => ({
    user: state.user
});

const mapDispatchToProps = {
    setUserData,
    signInAction,
    signUpAction,
    logoutAction
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);