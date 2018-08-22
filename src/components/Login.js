import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { checkLogin } from '../store/login/actions';

class Login extends Component {
    
    handleClickCheckLogin = () => {
        const emailValue = this.EmailValue.value;
        const passwordValue = this.PasswordValue.value;
        this.props.checkLogin(emailValue, passwordValue);
    }

    showError = () => {
        return (
            <div className="error">
                Email or password is invalid
            </div>
        );
    }

    render() {  
        const { redirect, loginError } = this.props;

        if(redirect) {
            return <Redirect to="/"/>;
        }
       
        return (
            <div className="form_box">
                <h1>Sign In</h1>
                <p><Link to="/register">Need an account?</Link></p>
                {loginError && this.showError()}
                <div className="form_item">
                    <input className="email_input" placeholder="Email" defaultValue="andranikminasyan1@gmail.com" ref={el => this.EmailValue = el}/>
                </div>
                <div className="form_item">
                    <input className="password_input" type="password" placeholder="Password" ref={el => this.PasswordValue = el}/>
                </div>
                <button className="submit_button" onClick={this.handleClickCheckLogin}>
                    Sign In
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { login: { redirect, loginError } } = state;

    return {
        redirect,
        loginError
    };
};

const mapDispatchToProps = (dispatch) => ({
    checkLogin(email, password){ 
        dispatch(checkLogin(email, password))
    },  
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);