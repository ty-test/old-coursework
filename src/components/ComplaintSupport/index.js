import React from 'react';
import {Link} from 'react-router-dom';
import './ComplaintSupport.css'
import axios from "axios";
import check from "./img/check.png";
import ask from "./img/ask.png";

class ComplaintSupport extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            complaints: [],
            name: "",
            id: "",
            content_complaint_answer: []
        };

        this.getComplaints = this.getComplaints.bind(this);
        this.getComplaints();


        this.setAnswer = this.setAnswer.bind(this);
    }

    onChange(e) {
        e.preventDefault();
        let arrAnswer = this.state.content_complaint_answer;
        arrAnswer[e.target.id] = e.target.value;
        this.setState({content_complaint_answer : arrAnswer});

        // this.state.content_complaint_answer[complaint.id]
        this.setState({id: e.target.id});
    }

    setAnswer(e) {
        e.preventDefault();
        let params = new URLSearchParams();
        params.append('idComplaint', this.state.id);
        params.append("body", this.state.content_complaint_answer[this.state.id]);
        fetch('http://localhost:8080/answerForComplaint', {
            method: 'POST',
            credentials: 'include',
            body: params
        }).then(res => {
            if (res.status !== 401) {
                this.getComplaints();
                this.setState({[this.state.content_complaint_answer[this.state.id]]: ""});
            }
        }).catch(err => {
            console.log(err);
        });
    }

    test(){
        return this
    }

    exit(){
        axios.get('http://localhost:8080/logout', {
            withCredentials: true
        });
    }

    getComplaints() {
        axios.get('http://localhost:8080/allComplaintsForSupport', {
            withCredentials: true,
        })
            .then(res => {
                if (res.status !== 401) {
                    this.setState({complaints: res.data});
                    console.log(res.data);
                }
            }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div>
                <div id="art">
                    <div id="name_art">Жалобы пользователей</div>
                    {this.state.complaints.map(
                        complaint => {
                            return (
                                <div className="one_complaint">
                                    <div className="complaint_list">
                                        <div className="name_user"><b>Пользователь:{complaint.user_name}</b></div>
                                        <br/>
                                        <div className="body_complaint">{complaint.body}</div>
                                        <br/>
                                        {complaint.checker ?
                                            <div>
                                                <img className="checkTips" src={check} alt="иллюстрация"/>
                                                <div className="answer_complaint">
                                                    <div className="name_user">
                                                        <b>Ответ:</b>
                                                        {complaint.answer}</div>
                                                </div>
                                            </div>
                                            : <div>
                                                <img className="checkTips" src={ask} alt="иллюстрация"/>
                                                <form id="send_answer" onSubmit={this.setAnswer}>
                                                    <input type="text"
                                                           value={this.state.content_complaint_answer[complaint.id]}
                                                           onChange={this.onChange.bind(this)}
                                                           id={complaint.id}
                                                           placeholder="введите ответ на жалобу"
                                                           name="content_complaint_answer"
                                                           required/>
                                                    <button id="submit-vote" className="buttons"
                                                            type="submit">отправить
                                                    </button>
                                                </form>
                                            </div>
                                        }
                                    </div>
                                </div>
                            )
                        }
                    )}
                    <div id="mainMenuForSupport">
                        <div className="category-wrap">
                            <h3>Основное меню</h3>
                            <ul>
                                <li>
                                    <div name="a"><Link to="/changeLevel">Блокировка пользователя</Link></div>
                                </li>
                                <li>
                                    <div name="a"><Link to="/bank">Банковская система</Link></div>
                                </li>
                                <li>
                                    <div name="a"><Link to="/filmAdd">Добавить фильм</Link></div>
                                </li>
                                <li>
                                    <div name="a"><Link to="/" onClick={this.exit}>Выход</Link></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
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

export default (ComplaintSupport);