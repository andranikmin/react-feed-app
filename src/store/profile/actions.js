import ArticleService from "../../services/ArticleService";
import UserService from "../../services/UserService";

export const GET_PROFILE_DATA  = 'GET_PROFILE_DATA';
export const GET_PROFILE_FAVORITES_ARTICLE = 'GET_PROFILE_FAVORITES_ARTICLE';
export const PROFILE_ARTICLE_SUCCESS = 'PROFILE_ARTICLE_SUCCESS';
export const CLEAR_PROFILE_DATA = 'CLEAR_PROFILE_DATA';
export const PROFILE_FAVORITES_ARTICLE = 'PROFILE_FAVORITES_ARTICLE';
export const PROFILE_FAVORITES_SUCCESS = 'PROFILE_FAVORITES_SUCCESS';


export const profileArticleDataSuccess = (payload) => {
    return {
        type: PROFILE_ARTICLE_SUCCESS,
        ...payload
    };
}

export const dataSuccessProfile = (data) => {
    return {
        type: GET_PROFILE_DATA,
        data
    };
}

export const dataSuccessProfileFavoritesArticle = (data) => {
    return {
        type: GET_PROFILE_FAVORITES_ARTICLE,
        data
    };
}

export const setInitialState = () => {
    return {
        type: CLEAR_PROFILE_DATA,
    };
}

export const favoriteSuccess = (data) => {
    return {
        type: PROFILE_FAVORITES_SUCCESS,
        data
    };
}

export const favoriteArticleSuccess = (data) => {
    return {
        type: PROFILE_FAVORITES_ARTICLE,
        data
    };
}

export const getProfileArticleData = (user, page = 0) => {
    return dispatch => ArticleService.getProfileArticleData(user, page).then(data => {
        dispatch(profileArticleDataSuccess({data, page: page+1}));
    });
};

export const getProfileData = (user) => {
    return dispatch => UserService.getProfileData(user).then(data => {
        dispatch(dataSuccessProfile(data));
    });
};

export const getProfileFavoritesArticleData = (user) => {
    return dispatch => ArticleService.getProfileFavoritesArticleData(user).then(data => {
        dispatch(dataSuccessProfileFavoritesArticle(data.articles));
    });
};

export const setFavorite = (slug, isFavorite, page = 'article') => {
    let method = "POST";

    if(isFavorite) {
        method = "DELETE";
    }
       
    return dispatch => ArticleService.setFavorite(slug, method).then(data => {
        if(page === "favorite"){
            dispatch(favoriteSuccess(data))
        }else{
            dispatch(favoriteArticleSuccess(data))
        }
    });
};