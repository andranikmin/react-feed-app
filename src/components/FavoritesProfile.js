import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ArticleList from '../components/ArticleList';
import { getProfileData, getProfileFavoritesArticleData, setFavorite } from '../store/profile/actions';


class FavoritesProfile extends Component {
    componentDidMount() {
        const { username } = this.props.match.params
        this.props.getProfileFavoritesArticleData(username);
        this.props.getProfileData(username);
    }

    render(){
        const { favoritesArticleData } = this.props;
        const { profileData: { profile } } = this.props;

        if(!profile) {
            return null;
        }
        
        return (
            <div className="favorite_page">
                <div className="profile_page_banner">
                    <img className="profile_page_avatar" src={profile.image}/>
                    <h3 className="profile_page_username">{profile.username}</h3>
                </div>
                <div className="container">
                    <div className="articles_filter">
                        <div className="filter_item">
                            <Link to={`/@${profile.username}`}>
                                My Articles
                            </Link>
                        </div>
                        <div className="filter_item active">
                            <Link to={`/@${profile.username}/favorites`}>
                                Favorited Articles
                            </Link>
                        </div>
                    </div>
                    <ArticleList articles={favoritesArticleData} onSetFavorite={this.props.setFavorite}/>
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    const { profile : { favoritesArticleData, profileData } } = state;

    return {
        favoritesArticleData,
        profileData
    };
};

const mapDispatchToProps = (dispatch) => ({
    getProfileFavoritesArticleData(user){ 
        dispatch(getProfileFavoritesArticleData(user))
    },
    getProfileData(user){ 
        dispatch(getProfileData(user))
    },
    setFavorite(slug, favorite, page = 'favorite') { 
        dispatch(setFavorite(slug, favorite, page))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesProfile);
