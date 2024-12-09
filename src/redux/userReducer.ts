import {Login} from "../types/types";

const UPDATE_LOGIN = "UPDATE_LOGIN";
const UPDATE_PROFILE = "UPDATE_PROFILE";
const UPDATE_REGISTERING_FLAG = 'UPDATE_REGISTER_FLAG';

export const defaultUserState:Login = {
    isAuthorized: false,
    loading: false,
    user: {
        role: 'GUEST',
        id: '',
        name: '',
        lastName: '',
        email: '',
        avatar: null,
        googleId: null,
        allowEmails: true,
    },
}

export default function userReducer(state = defaultUserState, action) {
    switch (action.type) {
        case UPDATE_LOGIN:
            return action.payload;

        case UPDATE_PROFILE:
            return {...state, user: {...state.user, ...action.payload}};

        case UPDATE_REGISTERING_FLAG:
            return {...state, isAuthorized: action.payload};
        default:
            return state
    }
}

export const updateLogin = (userData: object) => ({type:UPDATE_LOGIN, payload: userData})
export const updateProfileData = (message: object) => ({type:UPDATE_PROFILE, payload: message})
export const updateRegisterFlag = state => ({type: UPDATE_REGISTERING_FLAG, payload: state});