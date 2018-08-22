import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { publishArticle, setInitialState } from '../store/newpost/actions';


class NewPost extends Component {
    handleClickPublishArticle = () => {
        const articleTitle = this.articleTitle.value;
        const articleDesc = this.articleDesc.value;
        const articleBody = this.articleBody.value;
        const articleTags = this.articleTags.value;
        this.props.publishArticle({ articleTitle, articleDesc, articleBody, articleTags });
    }

    componentWillUnmount() {
        this.props.setInitialState();
    }

    showError = (errors) => {
        return (
            <div className="error">
                {errors.entries(([error, value], index) => (
                    <div key={error}>
                       * {error} {value}
                    </div> 
                ))} 
            </div>
        );
    }

    render() {
        const { redirect, article, publishErrors } = this.props; 

        if(redirect){
            return <Redirect to={`/article/${article.article.slug}`}/>;
        }

        return (
            <div className="container">
                <div className="new_article">
                    {publishErrors && this.showErrors(publishErrors)}
                    <div className="new_article_item">
                        <input className="new_article_input" placeholder="Article Title" ref={el => this.articleTitle = el}/>
                    </div>
                    <div className="new_article_item">
                        <input className="new_article_input" placeholder="What's this article about?" ref={el => this.articleDesc = el}/>
                    </div>
                    <div className="new_article_item">
                        <textarea className="new_article_textarea" placeholder="Write your article" ref={el => this.articleBody = el}></textarea>
                    </div>
                    <div className="new_article_item">
                        <input className="new_article_input" placeholder="Enter tags" ref={el => this.articleTags = el}/>
                    </div>
                    <button className="submit_button" onClick={this.handleClickPublishArticle}>Publish Article</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { newpost: { redirect, article, publishErrors } } = state;
    return {
        redirect,
        article,
        publishErrors
    };
};

const mapDispatchToProps = (dispatch) => ({
    publishArticle: (fields) => { 
        dispatch(publishArticle(fields))
    },
    setInitialState: () => { 
        dispatch(setInitialState())
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
