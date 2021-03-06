import React from 'react';
import './Bank.css'
import axios from "axios";
import {Link} from "react-router-dom";


class Bank extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            login: "",
            showControlPanel: false,
            purse: ""
        };

        this.onChange = this.onChange.bind(this);
        this.getStudioInfo = this.getStudioInfo.bind(this);
        this.hideInfo = this.hideInfo.bind(this);
        this.changePurse = this.changePurse.bind(this);
    }

    exit(){
        axios.get('http://localhost:8080/logout', {
            withCredentials: true
        });
    }

    onChange(e) {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value});
        console.log([e.target.name]+": " + e.target.value);
    }

    hideInfo() {
        this.setState({
            showControlPanel: false,
            login: "",
            newPurse: ""
        })
    }

    getStudioInfo(e) {
        e.preventDefault();
        let params = new URLSearchParams();
        params.append("login", this.state.login);
        axios.get('http://localhost:8080/getPurseStudio', {
            withCredentials: true,
            params
        })
            .then(res => {
                if (res.status !== 401) {
                    this.setState({
                        showControlPanel: true,
                        purse: res.data.purse
                    });
                }
            }).catch(err => {
            alert(err);
            return false;
        });
    }

    changePurse(e){
        e.preventDefault();
        let params = new URLSearchParams();
        params.append('login', this.state.login);
        params.append('purse', this.state.newPurse);
        fetch('http://localhost:8080/setPurse', {
            method: 'POST',
            credentials: 'include',
            body: params
        }).then(res => {
            if (res.status !== 401) {
                this.getStudioInfo(e);
            }
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div>
                <div id="name_art">???????????????????? ??????????????</div>
                {this.state.showControlPanel ?
                    <div>
                        <div id="info_bank">
                            <i><strong>????????????????????????:</strong></i> {this.state.login}<br/>
                            <i><strong>????????????:</strong></i> {this.state.purse}<br/>
                        </div>
                        <form id="form_for_set_bank" onSubmit={this.changePurse}>
                            <div id="set_new_purse">
                                <label htmlFor="set_login_for_bank">?????????? ?????????????????? ????????????????:</label>
                                <input type="number" id="set_purse" placeholder="?????????????? ????????????"
                                       onChange={this.onChange}
                                       value={this.state.newPurse}
                                       name="newPurse" required/>
                            </div>
                            <button id="submit-change_bank" className="buttons" type="submit">????????????????</button>
                        </form>
                        <button id="back" className="buttons" onClick={this.hideInfo}>??????????</button>
                    </div>
                    :
                    <div>
                        ???????????????? ???????????? ?? ?????????? ????????????????????????:
                        <form id="form_for_search_bank_studio" onSubmit={this.getStudioInfo}>

                            <div>
                                <label htmlFor="set_login_for_bank">?????????? ????????????:</label>
                                <input type="text" id="set_login_for_bank" placeholder="?????????????? ??????????"
                                       onChange={this.onChange}
                                       value={this.state.login}
                                       name="login" required/>
                            </div>
                            <button id="submit-search_bank" className="buttons" type="submit">??????????</button>
                        </form>
                    </div>
                }
                <div id="mainMenuForAddNewFilm">
                    <div className="category-wrap">
                        <h3>???????????????? ????????</h3>
                        <ul>
                            <li>
                                <div name="a"><Link to="/changeLevel">???????????????????? ????????????????????????</Link></div>
                            </li>
                            <li>
                                <div name="a"><Link to="/filmAdd">???????????????? ??????????</Link></div>
                            </li>
                            <li>
                                <div name="a"><Link to="/complaintSupport">???????????????? ???? ????????????</Link></div>
                            </li>
                            <li>
                                <div name="a"><Link to="/" onClick={this.exit}>??????????</Link></div>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        )
    }
}

// function mapStateToProps(state) {
//     return {
//         info: state.infoReducer.info,
//     }
// }
//
//
// function mapDispatchToProps(dispatch) {
//     return {
//         setInfo: (info) => {
//             dispatch(setInfo(info));
//         }
//     }
// }connect(mapStateToProps, mapDispatchToProps)

export default (Bank);