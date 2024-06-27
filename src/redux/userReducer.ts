import {Login} from "../types/types";

const UPDATE_LOGIN = "UPDATE_LOGIN";
const UPDATE_PROFILE = "UPDATE_PROFILE";
const UPDATE_ERROR_MESSAGE = "UPDATE_ERROR_MESSAGE";
const UPDATE_SUCCESS_MESSAGE = "UPDATE_SUCCESS_MESSAGE";
export const defaultState:Login = {
    isAuthorized: false,
    user: {
        role: 'GUEST',
        id: '',
        name: '',
        lastName: '',
        email: '',
        gender: 'MALE',
        birthday: new Date,
    },
    errorMessage: '',
    successMessage: ''
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case UPDATE_LOGIN:
            return action.payload;

        case UPDATE_PROFILE:
            console.log('??????????',{...state.user, ...action.payload});
            return {...state, user: {...state.user, ...action.payload}};

        case UPDATE_ERROR_MESSAGE:
            return {...state, errorMessage: action.payload};

        case UPDATE_SUCCESS_MESSAGE:
            return {...state, successMessage: action.payload};

        default:
            return state
    }
}

export const updateLogin = (userData: object) => ({type:UPDATE_LOGIN, payload: userData})
export const updateProfileData = (message: object) => ({type:UPDATE_PROFILE, payload: message})
export const updateProfileErrorMessage = (message: string) => ({type:UPDATE_ERROR_MESSAGE, payload: message})
export const updateProfileSuccessMessage = (message: string) => ({type:UPDATE_SUCCESS_MESSAGE, payload: message})
