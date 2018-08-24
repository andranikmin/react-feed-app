import UserService from "../../services/UserService";

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const LOGOUT = 'LOGOUT';

export const loginSuccess = () => {
    return {
        type: LOGIN_SUCCESS
    };
}

export const loginFailure = (errors) => {
    return {
        type: LOGIN_FAILURE,
        errors
    };
}

export const profileSuccess = (profile) => {
    return {
        type: PROFILE_SUCCESS,
        profile
    };
}

export const registerSuccess = () => {
    return {
        type: REGISTER_SUCCESS
    };
}

export const registerFailure = (errors) => {
    return {
        type: REGISTER_FAILURE,
        errors
    };
}

export const logOut = () => {
    return {
        type: LOGOUT
    }; 
}

export const checkLogin = (email, password) => {
    return dispatch => UserService.checkLogin(email, password).then(data => {
        if(data.user) {
            localStorage.setItem('token', data.user.token);
            localStorage.setItem('user', data.user.username);
            dispatch(profileSuccess(data.user));
            dispatch(loginSuccess(data.user));
        } else {
            dispatch(loginFailure(data.errors));
        }
    });
};

export const register = (username, email, password) => {
    return dispatch => UserService.register(username, email, password).then(data => {
        if(data.user) {
            localStorage.setItem('token', data.user.token);
            localStorage.setItem('user', data.user.username);
            dispatch(profileSuccess(data.user));
            dispatch(registerSuccess());
        } else {
            dispatch(registerFailure(data.errors));
        }
    });
};

export const getProfile = () => {
    return dispatch => UserService.getProfile().then(profile => {
        dispatch(profileSuccess(profile.user));
    });
};

