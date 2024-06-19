import {updateLogin} from "../redux/userReducer";

export const setUserData = (isAuthorized) => {
    const updatedLoginState = {
        isAuthorized: isAuthorized,
        user: {
            role: 'guest',
        }
    }
    return async (dispatch) => {
        dispatch(updateLogin(updatedLoginState));
    };
};


export const signInAction = (user) => {
    const updatedLoginState = {
        isAuthorized: false,
        // loading: false,
        user: {
            role: 'user',
            id: 123123,
            email: user.email,
            name: 'userName',
            surname: 'userSurname',
        },
        status: 404,
        errorMessage: 'Not found'
    }

    return (dispatch) => {
        setTimeout(() => {
            dispatch(updateLogin(updatedLoginState));
        }, 200);
    };
};

