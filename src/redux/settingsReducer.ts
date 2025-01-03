import {SettingsTypes} from "../types/types";
import {getSystemTheme} from "../helpers/helper";

const UPDATE_THEME = "UPDATE_THEME";
const UPDATE_LANGUAGE = "UPDATE_LANGUAGE";
const defaultState:SettingsTypes = {
    theme: getSystemTheme(),
    language: 'en',
    messagesQueue: []
}

export default function settingsReducer(state = defaultState, action) {
    switch (action.type) {
        case UPDATE_THEME:
            return {
                ...state,
                theme: action.payload,
            };

        case UPDATE_LANGUAGE:
            return {
                ...state,
                language: action.payload,
            };
        case 'ADD_MESSAGE':
            return {
                ...state,
                messagesQueue: [...state.messagesQueue, {createdAt: Date.now(), value: action.payload.message, type: action.payload.type}],
            };
        case 'REMOVE_MESSAGE':
            return {
                ...state,
                messagesQueue: state.messagesQueue.slice(1)
            };
        default:
            return state
    }
}

export const updateTheme = (theme) => ({type:UPDATE_THEME, payload: theme})
export const updateCurrentLanguage = (language) => ({type:UPDATE_LANGUAGE, payload: language})

export const addMessageToQueue = (message) => ({
    type: 'ADD_MESSAGE',
    payload: message,
});

export const removeMessageFromQueue = () => ({
    type: 'REMOVE_MESSAGE',
});