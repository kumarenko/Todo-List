import {updateTheme, updateCurrentLanguage} from "../redux/settingsReducer";
import i18n from "i18next";

export const changeTheme = (newTheme) => {
    return async (dispatch) => {
        dispatch(updateTheme(newTheme));
    };
};

export const changeLanguage = (language) => {
    return (dispatch) => {
        i18n.changeLanguage(language);
        dispatch(updateCurrentLanguage(language));
    };
};
