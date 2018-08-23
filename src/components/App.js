import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';

import Header from './Header';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import NewPost from './NewPost';
import Profile from './Profile';
import FavoritesProfile from './FavoritesProfile';
import Article from './Article';

import { getProfile, logOut } from '../store/login/actions';
import github_icon from '../assets/images/github_icon.png';

class App extends Component {
    constructor() {
        super();
        this.state = {
            logout: false
        };
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if(token) {
            this.props.getCurrentUser();
        }
    }

    componentDidUpdate(nextProps) {
        const { loggedIn } = this.props;

        if(loggedIn !== nextProps.loggedIn && !nextProps.loggedIn) {
            this.setState({
                logout: true
            });
        }
    }

    getRoutes = (profile) => {
        const routes = [{
            to: '/',
            name: 'Home'
        }];

        if(profile.username) {
            routes.push({
                    to: '/new-post',
                    name: 'New Post'
                },
                {
                    to: `/@${profile.username}`,
                    name: profile.username
                },
                {
                    action: this.props.logOut,
                    name: 'Logout'
                }
            );
        } else {
            routes.push({
                to: '/login',
                name: 'Sign In'
            },
            {
                to: '/register',
                name: 'Sign Up'
            });
        }

        return routes;
    }
    
    render() {
        const { profile } = this.props;
        const { logout } = this.state;
  
        if(logout) {
            return <Redirect to="/" />;
        }

        return (
            <div> 
                <Header routes={this.getRoutes(profile)}/>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/new-post' component={NewPost}/>
                    <Route path="/article/:id" component={Article} />
                    <Route path="/@:username/favorites" component={FavoritesProfile} />
                    <Route path="/@:username" component={Profile} />
                </Switch>
                <div className="github_page">
                    <a className="github_link" target="_blank" href="https://github.com/andranikmin/react-feed-app">
                        <img className="github_icon" src={github_icon} />
                        <div>Fork on GitHub</div>
                    </a>
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    const { login: { profile } } = state;

    return {
        profile
    };
};

const mapDispatchToProps = (dispatch) => ({
    getCurrentUser(){ 
        dispatch(getProfile())
    },
    logOut(){ 
        dispatch(logOut())
    },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
