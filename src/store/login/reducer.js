import { LOGIN_SUCCESS,
    LOGIN_FAILURE, 
    PROFILE_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_SUCCESS,
    LOGOUT
} from './actions';

const initialState = {
    redirect: false,
    profile: {},
    loginError: null,
    registerError: null,
    loggedIn: false
};

const login = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS: {
            return {
                ...state,
                redirect: true,
                loggedIn: true
            };
        }
        case LOGIN_FAILURE: {
            return {
                ...state,
                loginError: action.errors
            };
        }
        case PROFILE_SUCCESS: {
            return {
                ...state,
                profile: action.profile,
                redirect: true
            };
        }
        case REGISTER_SUCCESS: {
            return {
                ...state,
                redirect: true
            };
        }
        case REGISTER_FAILURE: {   
            return {
                ...state,
                registerError: action.errors
            };
        }
        case LOGOUT: {
            localStorage.removeItem('token');
            return initialState;
        }
        default:
        return state;
    }
};

export default login;