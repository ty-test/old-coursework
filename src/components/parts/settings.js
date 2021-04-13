import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from "axios";
import {setAuthorised, setUnAuth} from "../../_actions/login"
import "../componentCSS/settings.css"

class Set extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showResults: false,
            firstName: '',
            lastName: '',
            mobile: '',
            email: '',
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
        axios.post('http://localhost:8080/changeSet', params, {withCredentials:true}).then(
            response => {
                if (response.status === 200) {
                    this.setState({showResults:false});
                    window.location.reload(true);
                }
            }
        ).catch(err => {
                this.setState({err: true});
                //  return false;
            }
        );
    }

    showLogin = () => {
        this.setState({showResults: true});
    };

    hideLogin = () => {
        this.setState({ showResults: false, egg: false });
    };


    render() {
        return (
            <div>
                <button onClick={this.showLogin} className="ordinary" style={{
                    width: '140px',
                    height: '25px',
                    color: 'white',
                    background: 'black'
                }}>Данные</button>

                { this.state.showResults ?
            <div className="settings">
                {this.state.err ?
                    <p className='Err'>Error</p> : null}
                <div className="chngbr">
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <input type="text" className="form-control" name="firstName" value={this.state.firstName}
                                   onChange={this.handleChange} placeholder="First Name"/>
                        </div>

                        <br/>
                        <div>
                            <input type="text" className="form-control" name="lastName" value={this.state.lastName}
                                   onChange={this.handleChange} placeholder="Last Name"/>
                        </div>

                        <br/>
                        <div>
                            <input type="text" className="form-control" name="mobile" value={this.state.mobile}
                                   onChange={this.handleChange} placeholder="Mobile number"/>
                        </div>

                        <br/>
                        <div>
                            <input type="text" className="form-control" name="email" value={this.state.email}
                                   onChange={this.handleChange} placeholder="Email "/>
                        </div>

                        <br/>

                        <div className="form-group">
                            <button className="btn btn-primary" style={{
                                color: 'white',
                                background: 'black',
                                border:'none'
                            }}>Change
                            </button>

                            <button type="button" onClick={this.hideLogin}
                                    className="cancelbtn">Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>:null}
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

export default connect(mapStateToProps, mapDispatchToProps)(Set);