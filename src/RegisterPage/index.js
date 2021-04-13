import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from "axios";
import {setAuthorised, setUnAuth} from "../_actions/login"
import "./register.css"
import ico from "../components/LoginPage/ico.PNG";

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            firstName: '',
            lastName: '',
            mobile: '',
            email: '',
            username: '',
            password: '',
            err: false

        };


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();
        let params = new URLSearchParams();
        params.append('firstName', this.state.firstName);
        params.append('lastName', this.state.lastName);
        params.append('mobile', this.state.mobile);
        params.append('email', this.state.email);
        params.append('username', this.state.username);
        params.append('password', this.state.password);
        axios.post('http://localhost:8080/registration', params, {}).then(
            response => {
                if (response.status === 200) {
                    this.props.setAuthorised();
                    this.props.history.push('/');
                    alert("You are registered! Please, log in");
                }
            }
        ).catch(err => {
                this.props.setUnAuth();
                this.setState({err: true});
                //  return false;
            }
        );
    }

    render() {
        return (
            <div className="k">
                <h2>Register</h2>
                {this.state.err ?
                    <p className='loginErr'>Не удалось авторизоваться, проверьте правильность
                        введенных данных</p> : null}
                <div className="reg1">
                    <form name="regForm" onSubmit={this.handleSubmit}>

                        <div className="userICO">
                            <img src={ico}/>
                        </div>

                        <div>
                            <label htmlFor="firstName">First Name </label>
                            <input type="text" className="form-control" name="firstName" value={this.state.firstName}
                                   onChange={this.handleChange.bind(this)} required/>
                        </div>

                        <br/>
                        <div>
                            <label htmlFor="lastName">Last Name </label>
                            <input type="text" className="form-control" name="lastName" value={this.state.lastName}
                                   onChange={this.handleChange.bind(this)}/>

                        </div>

                        <br/>
                        <div>
                            <label htmlFor="lastName">Mobile number </label>
                            <input type="text" className="form-control" name="mobile" value={this.state.mobile}
                                   onChange={this.handleChange.bind(this)}/>
                        </div>

                        <br/>
                        <div>
                            <label htmlFor="username">Email </label>
                            <input type="text" className="form-control" name="email" value={this.state.email}
                                   onChange={this.handleChange.bind(this)}/>
                        </div>

                        <br/>

                        <div>
                            <label htmlFor="username">Username </label>
                            <input type="text" className="form-control" name="username" value={this.state.username}
                                   onChange={this.handleChange.bind(this)}/>
                        </div>

                        <br/>

                        <div>
                            <label htmlFor="password">Password </label>
                            <input type="password" className="form-control" name="password" value={this.state.password}
                                   onChange={this.handleChange.bind(this)}/>
                        </div>
                        <br/>

                        <div className="form-group">
                            <button className="btn btn-primary" style={{
                                color: 'white',
                                background: 'black'
                            }}>Register
                            </button>
                            <br/>
                            <Link to="/" style={{color: 'black'}}>Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {isAuthorised: state.loginReducer.isAuthorised}
}

function mapDispatchToProps(dispatch) {
    return {
        setAuthorised: () => {
            dispatch(setAuthorised());
        },
        setUnAuth: () => {
            dispatch(setUnAuth());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);