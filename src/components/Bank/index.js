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
                <div id="name_art">Банковская система</div>
                {this.state.showControlPanel ?
                    <div>
                        <div id="info_bank">
                            <i><strong>Пользователь:</strong></i> {this.state.login}<br/>
                            <i><strong>Баланс:</strong></i> {this.state.purse}<br/>
                        </div>
                        <form id="form_for_set_bank" onSubmit={this.changePurse}>
                            <div id="set_new_purse">
                                <label htmlFor="set_login_for_bank">Новое состояние кошелька:</label>
                                <input type="number" id="set_purse" placeholder="введите данные"
                                       onChange={this.onChange}
                                       value={this.state.newPurse}
                                       name="newPurse" required/>
                            </div>
                            <button id="submit-change_bank" className="buttons" type="submit">изменить</button>
                        </form>
                        <button id="back" className="buttons" onClick={this.hideInfo}>назад</button>
                    </div>
                    :
                    <div>
                        Получить данные о счете пользователя:
                        <form id="form_for_search_bank_studio" onSubmit={this.getStudioInfo}>

                            <div>
                                <label htmlFor="set_login_for_bank">Логин студии:</label>
                                <input type="text" id="set_login_for_bank" placeholder="введите логин"
                                       onChange={this.onChange}
                                       value={this.state.login}
                                       name="login" required/>
                            </div>
                            <button id="submit-search_bank" className="buttons" type="submit">найти</button>
                        </form>
                    </div>
                }
                <div id="mainMenuForAddNewFilm">
                    <div className="category-wrap">
                        <h3>Основное меню</h3>
                        <ul>
                            <li>
                                <div name="a"><Link to="/changeLevel">Блокировка пользователя</Link></div>
                            </li>
                            <li>
                                <div name="a"><Link to="/filmAdd">Добавить фильм</Link></div>
                            </li>
                            <li>
                                <div name="a"><Link to="/complaintSupport">Ответить на жалобы</Link></div>
                            </li>
                            <li>
                                <div name="a"><Link to="/" onClick={this.exit}>Выход</Link></div>
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