import ArticleService from "../../services/ArticleService";

export const GET_ARTICLE_LIST_DATA = 'GET_ARTICLE_LIST_DATA';
export const SET_TAG   = 'SET_TAG';
export const FAVORITES_ARTICLE   = 'FAVORITES_ARTICLE';

export const dataSuccess = (payload) => {
    return {
        type: GET_ARTICLE_LIST_DATA,
        ...payload
    };
}

export const setTag = (tag) => {
    return {
        type: SET_TAG,
        tag
    };
}

export const favoriteSuccess = (data) => {
    return {
        type: FAVORITES_ARTICLE,
        data
    };
}

export const getArticlesData = (tag = null, page = 0) => {
    const tagFilter = tag ? `&tag=${tag}` : "";

    return dispatch => ArticleService.getArticlesData(tagFilter, page).then(data => {
        dispatch(dataSuccess({ data, tag, page: page + 1 }));
    });
};

export const setFavorite = (slug, isFavorite) => {
    let method = "POST";

    if(isFavorite) {
        method = "DELETE";
    }
       
    return dispatch => ArticleService.setFavorite(slug, method).then(data => {
        dispatch(favoriteSuccess(data))
    });
};