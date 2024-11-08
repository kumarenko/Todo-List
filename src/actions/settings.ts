import {updateTheme, updateUnits} from "../redux/settingsReducer";
import {USERS_URL} from "../configs/urls";

export const changeTheme = (newTheme) => {
    return async (dispatch) => {
        localStorage.setItem('theme', newTheme);
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
