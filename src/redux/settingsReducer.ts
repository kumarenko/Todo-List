import {SettingsTypes} from "../types/types";

const UPDATE_THEME = "UPDATE_THEME";
const defaultState:SettingsTypes = {
    theme: localStorage.getItem('theme') || 'LIGHT',
}

export default function settingsReducer(state = defaultState, action) {
    switch (action.type) {
        case UPDATE_THEME:
            return {
                ...state,
                theme: action.payload,
            };

        default:
            return state
    }
}

export const updateTheme = (list) => ({type:UPDATE_THEME, payload: list})