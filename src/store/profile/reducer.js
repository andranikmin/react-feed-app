import { 
    PROFILE_ARTICLE_SUCCESS, 
    GET_PROFILE_DATA, 
    GET_PROFILE_FAVORITES_ARTICLE ,
    CLEAR_PROFILE_DATA,
    PROFILE_FAVORITES_ARTICLE,
    PROFILE_FAVORITES_SUCCESS,
} from './actions';

const initialState = {
    articleData: {
        articles: null,
        articlesCount: 0
    },
    profileData: {},
    favoritesArticleData: null,
    currentPage: 1
};

const profile = (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_ARTICLE_SUCCESS: {
            return {
                ...state,
                articleData: action.data,
                currentPage: action.page
            };
        }
        case GET_PROFILE_DATA: {
            return {
                ...state,
                profileData: action.data
            };
        }
        case GET_PROFILE_FAVORITES_ARTICLE: {
            return {
                ...state,
                favoritesArticleData: action.data
            };
        }
        case CLEAR_PROFILE_DATA: {
            return initialState;
        }
        case PROFILE_FAVORITES_SUCCESS: {
            const clonedFavoritesArticleData = [...state.favoritesArticleData];
            const index = clonedFavoritesArticleData.findIndex(article => article.slug === action.data.article.slug);
            clonedFavoritesArticleData.splice(index, 1);
            
            return {
                ...state,
                favoritesArticleData : clonedFavoritesArticleData
            };
        }
        case PROFILE_FAVORITES_ARTICLE: {
            return {
                ...state,
                articleData: {
                    ...state.articleData,
                    articles: state.articleData.articles.map(article => {
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
        default: {
            return state;
        }
    }
};

export default profile;