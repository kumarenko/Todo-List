import {SettingsTypes} from "../types/types";
import {getSystemTheme} from "../helpers/helper";

const UPDATE_THEME = "UPDATE_THEME";
const UPDATE_UNITS = "UPDATE_UNITS";
const UPDATE_CURRENCY = "UPDATE_CURRENCY";
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

        case UPDATE_UNITS:
            return {
                ...state,
                isMetric: action.payload,
            };

        case UPDATE_CURRENCY:
            return {
                ...state,
                currency: action.payload,
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
export const updateUnits = (isMetric) => ({type:UPDATE_UNITS, payload: isMetric})
export const updateCurrency = (currency) => ({type:UPDATE_CURRENCY, payload: currency})
export const updateCurrentLanguage = (language) => ({type:UPDATE_LANGUAGE, payload: language})

export const addMessageToQueue = (message) => ({
    type: 'ADD_MESSAGE',
    payload: message,
});

export const removeMessageFromQueue = () => ({
    type: 'REMOVE_MESSAGE',
});