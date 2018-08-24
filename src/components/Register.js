import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { register } from '../store/login/actions';


class Register extends Component {
    handleClickCheckRegister = () => {
        const usernameValue = this.usernameValue.value;
        const emailValue = this.emailValue.value;
        const passwordValue = this.passwordValue.value;
        this.props.register(usernameValue, emailValue, passwordValue);
    }

    showError = () => {
        const { registerError } = this.props;
        const errorsValues = Object.values(registerError);
        const errorsKeys = Object.keys(registerError);

        return (
            <div className="error">
                {errorsKeys.map((error, index) => (
                    <div key={error}>* {error} {errorsValues[index][0]}</div> 
                ))} 
            </div>
        );
    }

    render() {
        const { redirect, registerError } = this.props; 

        if(redirect) {
            return <Redirect to="/"/>;
        } 

        return (
            <form onSubmit={this.handleClickCheckRegister}>
                <div className="form_box">
                    <h1>Sign Up</h1>
                    <Link to="/login"><p>Have an account?</p></Link>
                    {registerError && this.showError()}
                    <div className="form_item">
                        <input className="username_item" placeholder="Username" ref={el => this.usernameValue = el}/>
                    </div>
                    <div className="form_item">
                        <input className="email_input" placeholder="Email" ref={el => this.emailValue = el}/>
                    </div>
                    <div className="form_item">
                        <input className="password_input" type="password" placeholder="Password" ref={el => this.passwordValue = el}/>
                    </div>
                    <div className="form_item button">
                        <button type="submit" className="submit_button">
                            Sign Up
                        </button>
                    </div>
                </div> 
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    const { login: { redirect, registerError } } = state;
    return {
        redirect,
        registerError
    };
};

const mapDispatchToProps = (dispatch) => ({
    register(username, email, password){ 
        dispatch(register(username, email, password))
    }, 
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);