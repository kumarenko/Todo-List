import {
    defaultUserState,
    updateLogin,
    updateProfileData,
    updateProfileErrorMessage,
    updateProfileSuccessMessage
} from "../redux/userReducer";
import {LOGIN_URL, PROTECTED_ROUTE_URL, REGISTER_URL, USERS_URL} from "../configs/urls";
import {updateCurrency, updateUnits} from "../redux/settingsReducer";
import {logout, persistor, store} from "../redux";

export const setUserData = (isAuthorized) => {
    const updatedLoginState = {
        isAuthorized: isAuthorized,
        user: {
            role: 'GUEST',
        }
    }
    return async (dispatch) => {
        dispatch(updateLogin(updatedLoginState));
    };
};

export const signInAction = (user) => {
    return async (dispatch, state) => {
        const userState = state().user;
        dispatch(updateLogin({...userState, loading: true}));
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
            const updatedLoginState = {
                isAuthorized: true,
                loading: false,
                user: {
                    role: 'USER',
                    id: user._id || user.id || user.userId,
                    email: user.email,
                    name: user?.name || '',
                    lastName: user?.lastName || '',
                    avatar: user.avatar || '',
                    country: data.user.country,
                },
            }
            dispatch(updateCurrency(user.currency));
            updateUnits(user.metricUnits);
            sessionStorage.setItem('token', token);
            dispatch(updateLogin(updatedLoginState));

        } else {
            alert('Login failed!');
            dispatch(updateLogin({...userState, loading: false}));

        }
    };
};

export const checkUserSession:any = () => {
    const token = sessionStorage.getItem('token');
    return (dispatch) => {
        fetch(PROTECTED_ROUTE_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                //user data retrieving
                const updatedLoginState = {
                    isAuthorized: true,
                    user: {
                        role: 'USER',
                        id: data.user.id,
                        email: data.user.email,
                        name: data.user.name,
                        avatar: data.user.avatar,
                        googleId: data.user.googleId,
                        country: data.user.country,
                    },
                }
                dispatch(updateCurrency(data.user.currency));
                dispatch(updateLogin(updatedLoginState));
                dispatch(updateUnits(data.user.metricUnits));
            })
            .catch(error => console.error('There was a problem with your fetch operation:', error));
    }
}

export const logoutAction = () => {
    return async (dispatch) => {
        sessionStorage.setItem('token', '');
        store.dispatch(logout());
        await persistor.purge();
        dispatch(updateLogin(defaultUserState));
    };
};

export const signUpAction = (email, name,lastName, password) => {
    return async (dispatch, state) => {
        const userState = state().user;

        dispatch(updateLogin({...userState, loading: true}));

        const response = await fetch(REGISTER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, name, lastName, password })
        });
        const data = await response.json();
        if (response.status === 201) {
            dispatch(updateLogin({...defaultUserState, successMessage: data, loading: false}))
        } else {
            dispatch(updateLogin({...defaultUserState, errorMessage: data.message, loading: false}))
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
