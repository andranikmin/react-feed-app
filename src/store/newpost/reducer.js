import { PUBLISH_ARTICLE_SUCCES, PUBLISH_ARTICLE_FAILURE, CLEAR_REDIRECT } from './actions';

const initialState = {
    redirect: false,
    article: null,
    publishErrors: null,
};

const newpost = (state = initialState, action) => {
    switch (action.type) {
        case PUBLISH_ARTICLE_SUCCES: {
            return {
                ...state,
                redirect: true,
                article: action.article 
            };
        }
        case PUBLISH_ARTICLE_FAILURE: {
            return {
                ...state,
                publishErrors: action.errors
            };
        }
        case CLEAR_REDIRECT: {
            return {
                initialState
            };
        }

        default:
        return state;
    }
};

export default newpost;