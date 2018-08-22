import { GET_ARTICLE, SET_INITIAL_ARTICLE_DATA, DELETE_ARTICLE } from './actions';

const initialState = {
    data: {},
    redirect: false
};

const article = (state = initialState, action) => {
    switch (action.type) {
        case GET_ARTICLE: {
            return {
                ...state,
                data: action.data
            };
        }
        case SET_INITIAL_ARTICLE_DATA: {
            return initialState;
        }
        case DELETE_ARTICLE: {
            return {
                ...state,
                redirect: true
            };
        }
        default:
        return state;
    }
};

export default article;