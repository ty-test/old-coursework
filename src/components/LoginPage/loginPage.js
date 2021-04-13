import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import MediaQuery from 'react-responsive';
import axios from "axios";
import {setAuthorised, setUnAuth} from "../../_actions/login"
import user from "./user.png";
import ico from "./ico.PNG";
import "./login.css"
import {signIn} from "../../_actions/actions";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nick: '',
            username: '',
            password: '',
            err: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleSubmit(e) {
        e.preventDefault();
        // устанавливаем параметры
        let params = new URLSearchParams();
        params.append('username', this.state.username);
        params.append('password', this.state.password);

        axios.get('http://localhost:8080/login', {
            params: {
                username: this.state.username,
                password: this.state.password
            }, withCredentials: true
        }).then(
            response => {
                if (response.status === 200) {
                    console.log(this.state.username);
                    this.props.signIn(this.state.username);
                    console.log("nick")
                    console.log(window.sessionStorage.getItem('nick'),
                    );
                    // window.location = '/customer';
                    this.props.history.push('/customer');
                    this.setState({err: false});
                }
            }
        ).catch(err => {
            console.log(err);
            this.setState({err: true});
            return false;
        });

    }

    render() {
        const {username, password} = this.state;
        return (
            <div>

                <div>
                    <h2>Login</h2>

                    <div className="u1">
                        <img src={user} width="300" height="400"/>
                    </div>

                    <div className="u2">
                        <img src={user} width="300" height="400"/>
                    </div>

                    <div id="logo1">
                        <form id="loginForm" onSubmit={this.handleSubmit}>
                            {this.state.err ? <p className='loginErr'>Username or password is incorrect</p> : null}

                            <div className="userICO">
                                <img src={ico}/>
                            </div>

                            <div id="username">
                                <input type="text" style={{height: '20px'}} name="username" value={username}
                                       onChange={this.handleChange}
                                       required placeholder="Username"/>
                            </div>
                            <br/>
                            <div id="pass">
                                {/*<label htmlFor="password">Password</label>*/}
                                <input type="password" className="form-control" name="password" value={password}
                                       onChange={this.handleChange} required placeholder="Password"/>
                            </div>
                            <br/>

                            <div id="buttonLogin">
                                <button style={{
                                    width: '265px',
                                    height: '25px',
                                    color: 'white',
                                    background: 'black',
                                    border: 'none'
                                }}>Login
                                </button>
                            </div>
                            <br/>
                            <div>
                                <Link type="button" to="/register">Register</Link>
                            </div>

                        </form>


                    </div>


                </div>

                <div id="discr">
                    использование сайта:
                    <br/>
                    если вы любите фильмы и все с ними связанное, наш сайт вас порадует
                    <br/>
                    изначально вы регистрируетесь как пользователь и имеете возможнось просматривать новостную ленту из
                    новинок кинемотографа,
                    <br/>
                    так же вы можете стать аналитиком/актером/студией.
                    <br/>
                    чтобы стать студией/аналитиком вы обязаны написать на посту создателей и запросить доступ к сайту,
                    как студия
                    <br/>
                    чтобы стать актером вы должны связаться со студией и уже она добавит вам доступ к сайту, как для
                    актера
                    <br/>


                </div>
                <br/>

                <div>
                </div>

            </div>
        );

    }

}

function mapStateToProps(state) {
    window.sessionStorage.setItem('nick', state.user.nick);
    return {
        isAuthorised: state.user.isAuthorised,
        nick: state.user.nick
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (nick) => dispatch(signIn(nick))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);