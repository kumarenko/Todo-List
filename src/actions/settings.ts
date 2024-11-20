import {updateTheme, updateUnits, updateCurrentLanguage} from "../redux/settingsReducer";
import {USERS_URL} from "../configs/urls";
import i18n from "i18next";

export const changeTheme = (newTheme) => {
    return async (dispatch) => {
        dispatch(updateTheme(newTheme));
    };
};
export const changeUnits = (userId, newValue) => {
    return async (dispatch) => {
        const response = await fetch(`${USERS_URL}/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({metricUnits: newValue})
        });

        if (response.ok) {
            const userData = await response.json();
            const data = userData.user;
            sessionStorage.setItem('token', userData.token);
            dispatch(updateUnits(data.metricUnits));
        }
    };
};

export const changeLanguage = (language) => {
    return (dispatch) => {
        i18n.changeLanguage(language);
        dispatch(updateCurrentLanguage(language));
    };
};
