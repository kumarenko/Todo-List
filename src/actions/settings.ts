import {updateTheme} from "../redux/settingsReducer";

export const changeTheme = (newTheme) => {
    return async (dispatch) => {
        localStorage.setItem('theme', newTheme);
        dispatch(updateTheme(newTheme));
    };
};