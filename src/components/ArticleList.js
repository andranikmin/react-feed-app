import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import favorite from '../assets/images/favorite.png';


export default  class ArticleList extends Component {
    handleClick = (slug, isFavorite) => {
        const token = localStorage.getItem('token');
        if(token) {
            this.props.onSetFavorite(slug, isFavorite);
        }
    }

    render() {
        const { articles } = this.props;

        if (!articles) {
            return (
                <div className="loading">Loading...</div>
            );
        }

        if (articles.length === 0) {
            return (
                <div className="article">
                    No articles are here... yet.
                </div>
            );
        }
        
        return (
            <div className="article_list">
                {articles.map(article => 
                    <div className="article" key={article.slug}>
                        <div className="article_banner">
                            <div className="user_info">
                                <Link to={`/@${article.author.username}`}>
                                    <img className="user_avatar_icon" src={article.author.image} />
                                </Link>
                                <Link className="username_author" to={`/@${article.author.username}`}>
                                    {article.author.username}
                                </Link>
                            </div>
                            <div className={article.favorited ? "is_favorite favorite" : "is_favorite"}
                             onClick={() => this.handleClick(article.slug, article.favorited)}>
                                <img src={favorite} />
                                <span className="favorite_count">{article.favoritesCount}</span>
                            </div>
                        </div>
                        <div className="article_info">
                            <div> 
                                <div className="article_title">
                                    {article.title}
                                </div>
                                <div className="article_description">
                                    {article.description}
                                </div>
                            </div>
                            <div className="article_date">  
                                {new Date(article.createdAt).toDateString()}
                            </div>
                        </div>
                        <div className="article_tags">
                            {article.tagList.map(tag => (
                                <div className="article_tag" key={tag}>
                                    {tag}
                                </div>
                            ))}
                        </div>
                        <Link className="read_more" to={`/article/${article.slug}`}>
                            Read more...
                        </Link>
                    </div>
                )}   
            </div>
        );
    };
}