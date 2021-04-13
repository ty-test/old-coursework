import React from 'react';
import './ChangeLeavel.css';
import {Link} from "react-router-dom";
import axios from "axios";


class ChangeLeavel extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            login: "",
            level: ""
        };
        this.onChange = this.onChange.bind(this);
        this.changeLevel = this.changeLevel.bind(this);
    }

    onChange(e) {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value});
    }

    changeLevel(e){
        e.preventDefault();
        let params = new URLSearchParams();
        params.append('login', this.state.login);
        params.append('level', this.state.level);
        fetch('http://localhost:8080/changeLevelAccess', {
            method: 'POST',
            credentials: 'include',
            body: params
        }).then(res => {
            if (res.status !== 401) {
                alert("Успешно изменен уровень доступа :)");
                this.setState({
                    login: "",
                    level: ""
                })
            }
        }).catch(err => {
            console.log(err);
        });
    }

    exit(){
        axios.get('http://localhost:8080/logout', {
            withCredentials: true
        });
    }

    render() {
        return (
            <div>
                <div id="name_art">Изменить уровень доступа</div>
                <div id="form_change_level_div">
                <form id="form_for_change_level" onSubmit={this.changeLevel}>
                    <div>
                        <label htmlFor="set_login">Логин пользователя:</label>
                        <input type="text" id="set_login" placeholder="введите логин"
                               onChange={this.onChange}
                               value={this.state.login}
                               name="login" required/>
                    </div><br/>
                    <div>
                        <label htmlFor="set_level">Уровень доступа:</label>
                        <input type="number" id="set_level" placeholder="введите уровень доступа"
                               onChange={this.onChange}
                               value={this.state.level}
                               name="level" required/>
                    </div><br/>
                    <button id="submit-change_level" className="buttons" type="submit">отправить</button>
                </form></div>

                <table className="simple-little-table" cellSpacing='0'>
                    <tr>
                        <th>Роль</th>
                        <th>Номер уровня</th>
                    </tr>

                    <tr>
                        <td>user</td>
                        <td>0</td>
                    </tr>

                    <tr>
                        <td>actor</td>
                        <td>1</td>
                    </tr>

                    <tr>
                        <td>analyst</td>
                        <td>2</td>
                    </tr>

                    <tr>
                        <td>studio</td>
                        <td>3</td>
                    </tr>

                    <tr>
                        <td>technical support</td>
                        <td>4</td>
                    </tr>

                </table>

                <div id="mainMenuForAddNewFilm">
                    <div className="category-wrap">
                        <h3>Основное меню</h3>
                        <ul>
                            <li>
                                <div name="a"><Link to="/bank">Банковская система</Link></div>
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

export default (ChangeLeavel);