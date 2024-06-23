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
export const validateSignUpForm = ({ email, password, confirmPassword, name, lastName }) => {
    let errors = [];
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
    } if(!name.length) {
        errors = {...errors, name: 'Name is required'};
    } if(!lastName.length) {
        errors = {...errors, lastName: 'Last name is required'};
    } if(password !== confirmPassword) {
        errors = {...errors, confirmPassword: 'Passwords do not match'};
    }
    return errors;
};