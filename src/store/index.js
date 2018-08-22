import { combineReducers } from 'redux';
import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware } from 'redux';
import login from './login/reducer';
import articleList from './articleList/reducer';
import tag from './tag/reducer';
import profile from './profile/reducer';
import article from './article/reducer';
import newpost from './newpost/reducer';
 
const rootReducer = combineReducers({
    login,
    articleList,
    tag,
    profile,
    article,
    newpost
});

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunkMiddleware)
);

export default store;
