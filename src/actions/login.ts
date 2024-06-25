import {defaultState, updateLogin} from "../redux/userReducer";

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
    return async (dispatch) => {
        const response = await fetch('http://localhost:4000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: user.email, password:user.password })
        });

        if (response.ok) {
            const data = await response.json();
            const updatedLoginState = {
                isAuthorized: true,
                // loading: false,
                user: {
                    role: 'USER',
                    id: data._id,
                    email: data.email,
                    name: data?.name,
                    lastName: data?.lastName,
                },
            }
            sessionStorage.setItem('token', data.token); // Получаем токен из хранилища
            dispatch(updateLogin(updatedLoginState));

        } else {
            alert('Login failed!');
        }
    };
};

export const checkUserSession:any = () => {
    const token = sessionStorage.getItem('token'); // Получаем токен из хранилища
    return (dispatch) => {
        fetch('http://localhost:4000/api/protected-route', {
            method: 'GET', // или 'POST', 'PUT', 'DELETE' и т.д.
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Добавление токена в заголовки
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
                        id: data.user._id,
                        email: data.user.email,
                        name: data.user?.name,
                        lastName: data.user?.lastName,
                    },
                }
                dispatch(updateLogin(updatedLoginState));
            })
            .catch(error => console.error('There was a problem with your fetch operation:', error));
    }
}

export const logoutAction = () => {
    return async (dispatch) => {
        sessionStorage.setItem('token', '');
        dispatch(updateLogin(defaultState));
    };
};

export const signUpAction = (email, name,lastName, password) => {
    return async (dispatch) => {

        const response = await fetch('http://localhost:4000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, name, lastName, password })
        });
        const data = await response.json();
        if (response.status === 201) {
            dispatch(updateLogin({...defaultState, successMessage: data}))
        } else {
            dispatch(updateLogin({...defaultState, errorMessage: data.message}))
        }
    }
};

