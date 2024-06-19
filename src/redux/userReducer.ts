const UPDATE_LOGIN = "UPDATE_LOGIN";
const defaultState = {
    isAuthorized: false,
    user: {
        role: 'guest',
        userId: null,
        name: '',
        surname: '',
        email: '',
    },
    errorMessage: ''
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case UPDATE_LOGIN:
            console.log(action.payload);
            return action.payload;

        default:
            return state
    }
}

export const updateLogin = (userData) => ({type:UPDATE_LOGIN, payload: userData})