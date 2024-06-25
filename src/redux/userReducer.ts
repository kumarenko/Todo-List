import {Login} from "../types/types";

const UPDATE_LOGIN = "UPDATE_LOGIN";
export const defaultState:Login = {
    isAuthorized: false,
    user: {
        role: 'GUEST',
        id: '',
        name: '',
        lastName: '',
        email: '',
    },
    errorMessage: '',
    successMessage: ''
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case UPDATE_LOGIN:
            return action.payload;

        default:
            return state
    }
}

export const updateLogin = (userData: object) => ({type:UPDATE_LOGIN, payload: userData})