import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import marked from 'marked';

import { getArticleData, setInitialState, deleteArticle } from '../store/article/actions';


class Article extends Component {
    componentDidMount() {
        const { id } = this.props.match.params
        this.props.getArticleData(id);
    }

    componentWillUnmount() {
        this.props.setInitialState();
    }

    deleteArticle = (slug) => {
        this.props.deleteArticle(slug);
    }

    render(){

        const { data : { article }, redirect } = this.props;
        const token = localStorage.getItem('token');

        if(token && redirect){
            return <Redirect to={`/@${article.author.username}`}/>
        }

        if (!article){
            return null;
        }

        return(
            <div className="article_page">
                <div className="article_page_banner">
                    <div className="container">
                        <h1>{article.title}</h1>
                        <div className="article_banner">
                            <div className="user_info">
                                <Link to={`/@${article.author.username}`}>
                                    <img className="user_avatar_icon" src={article.author.image} />
                                </Link>
                                <Link className="article_page_username" to={`/@${article.author.username}`}>
                                    {article.author.username}
                                </Link>
                            </div>
                            <div className="article_date">
                                <span>{new Date(article.createdAt).toDateString()}</span>
                            </div>
                        </div>
                        {token ? 
                        <div className="delete_article_block">
                            <span className="delete_article" onClick={() => this.deleteArticle(article.slug)}>
                                Delete Article
                            </span>
                        </div> : 
                        ""
                        }
                    </div>
                </div>
                <div className="article_box container">
                    <div className="article_body" 
                    dangerouslySetInnerHTML={{ __html: marked(article.body, { sanitize: true }) }} />
                     <div className="article_tags">
                        {article.tagList.map(tag => (
                            <div className="article_tag" key={tag}>
                                {tag}
                            </div>
                        ))}
                    </div>
                    <hr />
                </div>
            </div>
        )}
}

const mapStateToProps = (state) => {
    const { article : { data, redirect } } = state;
    return {
        data,
        redirect
    };
};

const mapDispatchToProps = (dispatch) => ({
    getArticleData(id){ 
        dispatch(getArticleData(id))
    },
    deleteArticle(slug){ 
        dispatch(deleteArticle(slug))
    },
    setInitialState(){ 
        dispatch(setInitialState())
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Article);

