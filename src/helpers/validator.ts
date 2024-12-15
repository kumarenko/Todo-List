import {t} from "i18next";

export const validateSignInForm = ({ email, password}) => {
    let errors = {};
    if(!email) {
        errors = {...errors, email: t('Email field is required')};
    }
    if(!password) {
        errors = {...errors, password: t('Password field is required')};
    }
    if (email.length && !String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
        errors = {...errors, email: t('Email is invalid')};
    }
    return errors;
};
export const validateEmail = (email: string) => {
    let errorMessage = '';
    if (!email.length || !String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
        errorMessage = t('Email is invalid');
    }
    return errorMessage
}
export const validateSignUpForm = ({ registerEmail, registerPassword, confirmPassword, name, accept }) => {
    let errors = {};
    if(!registerEmail.length) {
        errors = {...errors, email: t('Email field is required')};
    }
    if (registerEmail.length && !String(registerEmail)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
        errors = {...errors, email: t('Email is invalid')};
    } if(registerPassword.length < 8) {
        errors = {...errors, password: t('Password is too short')};
    } if(!name.length) {
        errors = {...errors, name: t('Name field is required')};
    } if(registerPassword !== confirmPassword) {
        errors = {...errors, confirmPassword: t('Passwords do not match')};
    } if(!accept) {
        errors = {...errors, accept: t('validationTermsAcceptance')};

    }
    return errors;
};

export const validateChangePassword = (current, newPassword, confirmNewPassword, googleId) => {
    let errors = {};
    if(!current.length && !googleId) {
        errors = {...errors, password: t('Password field is required')};
    }
    if(newPassword.length < 8) {
        errors = {...errors, newPassword: t('New password is too short')};
    }
    if(newPassword !== confirmNewPassword) {
        errors = {...errors, confirmPassword: t('Passwords do not match')};
    }
    if(!confirmNewPassword.length) {
        errors = {...errors, confirmPassword: t('Confirm password field is required')};
    }
    return errors;
}
export const validateForgotPassword = ({password, confirmPassword}) => {
    let errors = {};
    if(password !== confirmPassword) {
        errors = {...errors, confirmPassword: t('Passwords do not match')};
    }
    if(password.length < 8) {
        errors = {...errors, password: t('New password field is too short')};
    }
    if(confirmPassword.length < 8) {
        errors = {...errors, confirmPassword: t('Confirm password field is too short')};
    }
    if(!password.length) {
        errors = {...errors, password: t('Password field is required')};
    }
    if(!confirmPassword.length) {
        errors = {...errors, confirmPassword: t('Confirm password field is required')};
    }
    return errors;
}

export const reverseString = (str) => {
    let splitString = str.toString().split("");
    let reverseArray = splitString.reverse();
    return reverseArray.join("");
}
export const getColorById = (id) => {
    let idWithOnlyDigits = id.replace(/\D/g,'');
    let invertedId = parseInt(reverseString(idWithOnlyDigits));
    let k = (invertedId / 10 ** idWithOnlyDigits.length).toFixed(2);
    let h = 360 * k;
    let s = 50;
    let l = 50;
    return 'hsl(' + h + ',' + s + '%,' + l + '%)';
}
