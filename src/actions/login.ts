import {updateLogin} from "../redux/userReducer";

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
                    id: 123123,
                    email: data.email,
                    name: 'userName',
                    surname: 'userSurname',
                },
                status: 404,
                errorMessage: 'Not found'
            }
            sessionStorage.setItem('token', data.token); // Получаем токен из хранилища
            dispatch(updateLogin(updatedLoginState));

        } else {
            alert('Login failed!');
        }
    };
};

export const logoutAction = () => {
    return async (dispatch) => {
        sessionStorage.setItem('token', '');
    };
};

export const signUpAction = (email, password) => {
    return async (dispatch) => {

        const response = await fetch('http://localhost:4000/api/register', {
            method: 'POST',
            // mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        console.log(data);
        if (response.status === 201) {
            alert('Registration successful!');
        } else {
            alert('Registration failed!');
        }
    }
};

