import {
    defaultUserState,
    updateLogin,
    updateProfileData,
    updateProfileErrorMessage,
    updateProfileSuccessMessage, updateRegisterFlag
} from "../redux/userReducer";
import {
    ALLOW_EMAIL_SENDING_URL,
    FORGOT_PASSWORD_GENERATE_CODE_URL,
    FORGOT_PASSWORD_SUBMIT_CODE_URL,
    FORGOT_PASSWORD_URL,
    LOGIN_URL,
    PROTECTED_ROUTE_URL,
    REGISTER_URL, UPLOAD_AVATAR_URL, UPLOAD_URL,
    USERS_URL
} from "../configs/urls";
import {updateCurrency, updateUnits} from "../redux/settingsReducer";
import {logout, persistor, store} from "../redux";
import {getCountryCodeByIP} from "../helpers/helper";

export const setUserData = (isAuthorized) => {
    return async (dispatch) => {
        const country = await getCountryCodeByIP();
        const updatedLoginState = {
            isAuthorized: isAuthorized,
            user: {
                role: 'GUEST',
                country,
            }
        }
        dispatch(updateLogin(updatedLoginState));
    };
};

export const signInAction = (user) => {
    return async (dispatch, state) => {
        const userState = state().user;
        try {
            const response = await fetch(LOGIN_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: user.email, password:user.password })
            });

            if (response.ok) {
                const data = await response.json();
                const {token, user} = data;
                const country = await getCountryCodeByIP();
                const updatedLoginState = {
                    isAuthorized: true,
                    user: {
                        role: 'USER',
                        id: user._id || user.id || user.userId,
                        email: user.email,
                        name: user?.name || '',
                        lastName: user?.lastName || '',
                        avatar: user.avatar || '',
                        allowEmails: user.allowEmails,
                        country,
                    },
                }
                dispatch(updateCurrency(user.currency));
                updateUnits(user.metricUnits);
                sessionStorage.setItem('token', token);
                dispatch(updateLogin(updatedLoginState));
            } else {
                dispatch(updateLogin({...userState,errorMessage: 'Login failed', loading: false}));
            }
        } catch (e) {
            dispatch(updateLogin({...userState,errorMessage: 'Internal Server Error', loading: false}));
        }
    };
};

export const checkUserSession:any = () => {
    const token = sessionStorage.getItem('token');
    return (dispatch, state) => {
        const role = state().user.user.role;
        console.log('role', role, token);
        if(role === 'USER') {
            if(token) {
                fetch(PROTECTED_ROUTE_URL, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(response => {
                        if (!response.ok) {
                            dispatch(logoutAction('USER'));

                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(async (data) => {
                        //user data retrieving
                        const country = await getCountryCodeByIP();
                        console.log('BBBB',data.user.allowEmails);
                        const updatedLoginState = {
                            isAuthorized: true,
                            user: {
                                role: 'USER',
                                id: data.user.id,
                                email: data.user.email,
                                name: data.user.name,
                                avatar: data.user.avatar,
                                googleId: data.user.googleId,
                                allowEmails: data.user.allowEmails,
                                country,
                            },
                        }
                        dispatch(updateCurrency(data.user.currency));
                        dispatch(updateLogin(updatedLoginState));
                        dispatch(updateUnits(data.user.metricUnits));
                    })
                    .catch(error => {
                        console.error('There was a problem with your fetch operation:', error);
                        dispatch(logoutAction('USER'));
                    });
            } else {
                dispatch(logoutAction('USER'));
            }
        }
    }
}

export const logoutAction = (role) => {
    return async (dispatch) => {
        sessionStorage.setItem('token', '');
        if (role === 'USER') {
            await persistor.purge();
            store.dispatch(logout());
        }
        dispatch(updateRegisterFlag(false));
    };
};

export const signUpAction = (email, name, password) => {
    return async (dispatch) => {
       try {
           const response = await fetch(REGISTER_URL, {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
               },
               body: JSON.stringify({ email, name, password })
           });
           const data = await response.json();
           if (response.status === 201) {
               dispatch(updateLogin({...defaultUserState, successMessage: data}))
           } else {
               dispatch(updateLogin({...defaultUserState, errorMessage: data.message}))
           }
       } catch (e) {
           dispatch(updateLogin({...defaultUserState, errorMessage: 'Internal server error'}))
       }
    }
};

export const updateProfileInfo: any = (userId, data) => {
    return async (dispatch) => {
        const response = await fetch(`${USERS_URL}/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const userData = await response.json();
            const data = userData.user;
            sessionStorage.setItem('token', userData.token); // Получаем токен из хранилища
            dispatch(updateUnits(data.metricUnits));

            dispatch(updateProfileData(data));
            dispatch(updateProfileSuccessMessage(userData.message));
        } else {
            const userData = await response.json();
            dispatch(updateProfileErrorMessage(userData.message))
        }
    };
}
export const requestResetPassword = async email => {
    return await fetch(`${FORGOT_PASSWORD_GENERATE_CODE_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email}),
    });
};
export const sendCode = async (email, code) => {
    return await fetch(`${FORGOT_PASSWORD_SUBMIT_CODE_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, code}),
    });
};
export const changePassword = async (email, password) => {
    return await fetch(`${FORGOT_PASSWORD_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
    });
};

export const updateUserAvatarRequest = (selectedFile, itemId) => {
    return async (dispatch) => {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('item', itemId);
        try {
            const response = await fetch(UPLOAD_AVATAR_URL, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Upload failed: ${response.statusText}`);
            }
            const result = await response.json();
            if (result.success) {
                const data = result.user;
                sessionStorage.setItem('token', result.token); // Получаем токен из хранилища
                dispatch(updateUnits(data.metricUnits));
                dispatch(updateProfileData(data));
                dispatch(updateProfileSuccessMessage(result.message));

            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };
};
export const removeUserAvatarRequest = (fileName, itemId) => {
    return async (dispatch) => {
        try {
            const response = await fetch(UPLOAD_AVATAR_URL, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( {fileName, itemId}),
            });

            if (!response.ok) {
                throw new Error(`Upload failed: ${response.statusText}`);
            }
            const result = await response.json();
            if (result.success) {
                const data = result.user;
                sessionStorage.setItem('token', result.token); // Получаем токен из хранилища
                dispatch(updateProfileData(data));
                dispatch(updateProfileSuccessMessage(result.message));

            }
        } catch (e) {
            console.error('Error deleting file:', e);
        }
    };
};

export const allowEmailSendingRequest = (userId, allowEmails) => {
    return async (dispatch) => {
        try {
            const response = await fetch(ALLOW_EMAIL_SENDING_URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( {userId, allowEmails}),
            });

            if (response.ok) {
                const userData = await response.json();
                const data = userData.user;
                sessionStorage.setItem('token', userData.token); // Получаем токен из хранилища
                dispatch(updateUnits(data.metricUnits));

                dispatch(updateProfileData(data));
                dispatch(updateProfileSuccessMessage(userData.message));
            } else {
                const userData = await response.json();
                dispatch(updateProfileErrorMessage(userData.message))
            }
        } catch (e) {
            console.error('Error deleting file:', e);
        }
    };
};
