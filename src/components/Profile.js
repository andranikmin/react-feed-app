import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ArticleList from '../components/ArticleList';
import Pagination from '../components/Pagination';
import { getProfileArticleData, getProfileData, setInitialState, setFavorite } from '../store/profile/actions';


class Profile extends Component {
    componentDidMount() {
        const { match: { params: { username } } } = this.props;
        this.props.getProfileArticleData(username);
        this.props.getProfileData(username);
    }

    componentWillReceiveProps(nextProps) {
        const { match: { params: { username } } } = nextProps;
        const { match: { params: { username: currentUsername } } } = this.props;

        if(currentUsername !== username) {
            this.props.getProfileArticleData(username);
            this.props.getProfileData(username);
        }
    }

    componentWillUnmount() {
       this.props.setInitialState();
    }

    render(){
        const user = localStorage.getItem('user');
        const { articleData : { articles, articlesCount }, profileData: { profile }, currentPage } = this.props;
        if (!profile) {
            return null;
        }
        
        return (
            <div className="profile_page">
                <div className="profile_page_banner">
                    <img className="profile_page_avatar" src={profile.image || "https://static.productionready.io/images/smiley-cyrus.jpg"}/>
                    <h3 className="profile_page_username">{profile.username}</h3>
                </div>
                <div className="container">
                    <div className="articles_filter">
                        <div className="filter_item active">
                            <Link to={`/@${profile.username}`}>
                                {user && user === profile.username ? "My Articles" : "Articles"}
                            </Link>
                        </div>
                        <div className="filter_item">
                            <Link to={`/@${profile.username}/favorites`}>
                                {user && user === profile.username ? "My Favorite Articles" : "Favorite Articles"}
                            </Link>
                        </div>
                    </div>
                    <ArticleList articles={articles} onSetFavorite={this.props.setFavorite}/>
                    {articlesCount > 10 && 
                        <Pagination currentPage={currentPage} total={articlesCount}
                        getNext={(page) => this.props.getProfileArticleData(profile.username, page)} />
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { profile : { articleData, profileData, currentPage } } = state;
    return {
        articleData,
        profileData,
        currentPage
    };
};

const mapDispatchToProps = (dispatch) => ({
    getProfileArticleData(user, page){ 
        dispatch(getProfileArticleData(user, page))
    },
    getProfileData(user){ 
        dispatch(getProfileData(user))
    },
    setInitialState(){ 
        dispatch(setInitialState())
    },
    setFavorite(slug, favorite){ 
        dispatch(setFavorite(slug, favorite))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
