export const validateSignInForm = ({ email, password}) => {
    let errors = {};
    if(!email) {
        errors = {...errors, email: 'Email field is required'};
    }
    if (email.length && !String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
        errors = {...errors, email: 'Email is not valid'};
    } if(password.length < 8) {
        errors = {...errors, password: 'Password is too short'};
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
        errorMessage = 'Email is not valid';
    }
    return errorMessage
}
export const validateSignUpForm = ({ email, password, confirmPassword, name }) => {
    let errors = {};
    if(!email.length) {
        errors = {...errors, email: 'Email field is required'};
    }
    if (email.length && !String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
        errors = {...errors, email: 'Email is not valid'};
    } if(password.length < 8) {
        errors = {...errors, password: 'Password is too short'};
    } if(!name.length) {
        errors = {...errors, name: 'Name is required'};
    } if(password !== confirmPassword) {
        errors = {...errors, confirmPassword: 'Passwords do not match'};
    }
    return errors;
};

export const validateChangePassword = (current, newPassword, confirmNewPassword, googleId) => {
    let errors = {};
    if(!current.length && !googleId) {
        errors = {...errors, password: 'Password field is required'};
    }
    if(newPassword.length < 8) {
        errors = {...errors, newPassword: 'New Passwords is too short'};
    }
    if(newPassword !== confirmNewPassword) {
        errors = {...errors, confirmPassword: 'Passwords do not match'};
    }
    if(!confirmNewPassword.length) {
        errors = {...errors, confirmPassword: 'Confirm password field is required'};
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
