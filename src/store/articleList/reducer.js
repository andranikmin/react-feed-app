import { GET_ARTICLE_LIST_DATA, FAVORITES_ARTICLE } from './actions';

const initialState = {
    data: {
        articles: null,
        articlesCount: 0
    },
    tag: null,
    page: 1
};

const articleList = (state = initialState, action) => {
    switch (action.type) {
        case GET_ARTICLE_LIST_DATA: {
            return {
                ...state,
                data: action.data,
                tag: action.tag,
                page: action.page
            };
        }
        case FAVORITES_ARTICLE: {
            return {
                ...state,
                data: {
                    ...state.data,
                    articles: state.data.articles.map(article => {
                        if (article.slug === action.data.article.slug) {
                            return {
                                ...article,
                            favorited: action.data.article.favorited,
                            favoritesCount: action.data.article.favoritesCount
                            };
                        }
                        return article;
                    }),
                }
            };
        }
        default:
        return state;
    }
};

export default articleList;