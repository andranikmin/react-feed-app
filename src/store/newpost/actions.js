import ArticleService from "../../services/ArticleService";
import { API_URL } from "../../config";

export const PUBLISH_ARTICLE_SUCCES = 'PUBLISH_ARTICLE_SUCCES';
export const PUBLISH_ARTICLE_FAILURE = 'PUBLISH_ARTICLE_FAILURE';
export const CLEAR_REDIRECT = 'CLEAR_REDIRECT';

export const publishArticleSucces = (article) => {

    return {
        type: PUBLISH_ARTICLE_SUCCES,
        article
    };
}

export const publishArticleFailure = (errors) => {
    return {
        type: PUBLISH_ARTICLE_FAILURE,
        errors
    };
}

export const setInitialState = () => {
    return {
        type: CLEAR_REDIRECT,
    };
}

export const publishArticle = (fields) => {
    return dispatch => ArticleService.publishArticle(fields).then(data => {
        if(data.article) {
            dispatch(publishArticleSucces(data));
        }
        else {
            dispatch(publishArticleFailure(data.errors));
        }
    });
};