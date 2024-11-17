import {SettingsTypes} from "../types/types";

const UPDATE_THEME = "UPDATE_THEME";
const UPDATE_UNITS = "UPDATE_UNITS";
const UPDATE_CURRENCY = "UPDATE_CURRENCY";
const defaultState:SettingsTypes = {
    theme: 'light',
    units: 'METRIC',
    currency: 'usd',
    isMetric: true,
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

        default:
            return state
    }
}

export const updateTheme = (theme) => ({type:UPDATE_THEME, payload: theme})
export const updateUnits = (isMetric) => ({type:UPDATE_UNITS, payload: isMetric})
export const updateCurrency = (currency) => ({type:UPDATE_CURRENCY, payload: currency})