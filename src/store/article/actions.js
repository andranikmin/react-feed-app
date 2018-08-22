import ArticleService from "../../services/ArticleService";

export const GET_ARTICLE = 'GET_ARTICLE';
export const SET_INITIAL_ARTICLE_DATA = 'SET_INITIAL_ARTICLE_DATA';
export const DELETE_ARTICLE = 'DELETE_ARTICLE';

export const dataSuccess = (data) => {
    return {
        type: GET_ARTICLE,
        data
    };
}

export const setInitialState = () => {
    return {
        type: SET_INITIAL_ARTICLE_DATA,
    };
}

export const deleteSuccess = (data) => {
    return {
        type: DELETE_ARTICLE
    };
}

export const getArticleData = (id) => {
   return dispatch => ArticleService.getArticleData(id).then(data => {
        dispatch(dataSuccess(data));
    });
};

export const deleteArticle = (id) => {
    return dispatch => ArticleService.deleteArticle(id).then(data => {
        dispatch(deleteSuccess(data))
    });
 };


