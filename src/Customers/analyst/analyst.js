import React, {Component} from 'react';
import axios from "axios";
import "./analyst.css"

export default class Analyst extends React.Component {

    constructor({location}) {
        super();
        this.state = {
            nick: location.state.nick,
            showG: false,
            showMenu: false,
            score: '',
            posts: [],
            arr1: [],
            arr: [],
            info: '',
            photo: '',
            mail: '',
            summ: '',
            marc: null,
            marcSend: null,
            film: '',
            accept: '',
            answer: null,
            err: false

        };
        this.testSession = this.testSession.bind(this);
        this.testSession();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.marcSubmit = this.marcSubmit.bind(this);
        this.showForm();
    }


    testSession() {

        let params = new URLSearchParams();
        params.append('nick', this.state.nick);

        axios.post('http://localhost:8080/analystScore', params, {withCredentials: true}).then(
            res => {
                if (res.status !== 401) {
                    this.setState({score: res.data});
                    return true;
                }
            }
        ).catch(err => {
            console.log("score" + err);
            return false;
        });

        axios.post('http://localhost:8080/getLogo', params, {withCredentials: true})
            .then(res => {
                if (res.status !== 401) {
                    this.setState({photo: res.data});
                }
                else return false;
            }).catch(err => {
        });

        axios.post('http://localhost:8080/analystInfo', params, {withCredentials: true}).then(
            res => {
                if (res.status !== 401) {
                    this.setState({info: res.data});
                    return true;
                }
            }
        ).catch(err => {
            console.log("score" + err);
            return false;
        });

        axios.get('http://localhost:8080/myScore', {
            params: {
                nick: this.state.nick,
            }, withCredentials: true
        }).then(
            res => {
                if (res.status !== 401) {
                    this.setState({marc: res.data});
                    console.log(this.state.marc);
                    return true;
                }
            }
        ).catch(err => {
            console.log("marc" + err);
            return false;
        });


        axios.post('http://localhost:8080/analystReview', params, {withCredentials: true}).then(
            res => {
                if (res.status !== 401) {
                    this.setState({posts: res.data});
                    this.setState({showG: true});
                    console.log(this.state.posts);
                    return true;
                }
            }
        ).catch(err => {
            console.log("posts" + err);
            return false;
        });
    }


    createTable(arr1) {
        let table = [];
        let length = arr1.length;
        console.log(length);
        if (length === 0) {
            table.push(<div>пока ничего нет</div>)
        }else {
            for (let i = 0; i < length; i++) {
                table.push(
                    <div>

                        <div id="lilPost" style={{
                            width: '900px',
                            border: 'none',
                        }}>
                            <p>{arr1[i].body}</p>
                            ________________________________________________________________________________________
                        </div>
                        <br/>
                    </div>
                )
            }
        }
        return table
    }

    showForm = () => {
        this.setState({showMenu: true});
    };
    hideForm = () => {
        this.setState({showMenu: false});
    };

    handleChange(e) {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault();
        // устанавливаем параметры
        let params = new URLSearchParams();
        params.append('nick', this.state.nick);
        params.append('mail', this.state.mail);
        params.append('summ', this.state.summ);
        params.append('film', this.state.film);

        axios.post('http://localhost:8080/summ', params, {withCredentials: true}).then(
            response => {
                if (response.status === 200) {

                    this.setState({answer: "ждите ответ"});
                }
            }
        ).catch(err => {
            console.log(err);
            this.setState({err: true});
            return false;
        })

    }

    marcSubmit(e) {
        e.preventDefault();
        let params = new URLSearchParams();
        params.append('nick', this.state.nick);
        params.append('marc', this.state.marcSend);


        axios.post('http://localhost:8080/marc', params, {withCredentials: true}).then(
            response => {
                if (response.status === 200) {

                    window.location.reload();
                }
            }
        ).catch(err => {
            console.log(err);
            this.setState({err: true});
            return false;
        })

    }

    render() {

        return (

            <div>

                <div id="analystsssssss" style={{
                    width: '1000px',
                    height: '100%'
                }}>


                <div id="analystPic">
                    <img id="analystLogo" style={{left:'200px'}} src={this.state.photo}/>
                    <p>{this.state.nick}</p>
                    <p>{this.state.info}</p>

                </div>

                <div style={{
                    width: '800px',
                    height: '200px'
                }}>

                    <div id="ratingAnalyst">
                        <p>рейтинг</p>

                        <div className="circle">
                            <div className="number">
                                {this.state.score}
                            </div>
                        </div>
                    </div>

                    <div id="marcAnalyst">
                        <p>ваша оценка</p>
                        {(this.state.marc === null || this.state.marc === 0) ?
                            <form className="marcForm" onSubmit={this.marcSubmit}>
                                <input type="text" name="marcSend" value={this.state.marcSend}
                                       onChange={this.handleChange} required placeholder="оценочка(0-100)"/>
                                <button style={{
                                    width: '100px',
                                    height: '25px',
                                    color: 'white',
                                    background: 'black',
                                    border: 'none'
                                }} className="marc">оценить
                                </button>
                            </form> :
                            <div className="circle">
                                <div className="number">{this.state.marc}</div>
                            </div>}


                    </div>

                </div>



                <div id="buttonsAnalyst">
                    <div>
                        <button id="mail" onClick={this.showForm} disabled={this.state.answer} style={{
                            width: '150px',
                            height: '25px',
                            color: 'white',
                            background: 'black',
                            border: 'none'
                        }}>написать
                        </button>
                    </div>


                    {(this.state.showMenu) && (this.state.answer === null) ?
                        <div>
                            <form id="sendMail" onSubmit={this.handleSubmit}>
                                {this.state.err ? <p className='loginErr'>incorrect</p> : null}
                                <input type="text" name="mail" value={this.state.mail}
                                       onChange={this.handleChange} required placeholder="mail"/>
                                <input type="text" name="summ" value={this.state.summ}
                                       onChange={this.handleChange} required placeholder="summ"/>
                                <input type="text" name="film" value={this.state.film}
                                       onChange={this.handleChange} required placeholder="film"/>

                                <br/>

                                <button style={{
                                    width: '150px',
                                    height: '25px',
                                    color: 'white',
                                    background: 'black',
                                    border: 'none'
                                }}>отправить
                                </button>

                                <button id="mail" onClick={this.hideForm} style={{
                                    width: '150px',
                                    height: '25px',
                                    color: 'white',
                                    background: 'black',
                                    border: 'none'
                                }}>закрыть
                                </button>

                            </form>
                        </div> :
                        <div id="answer">
                            {this.state.answer}
                        </div>

                    }
                </div>


                <br/>

                <div id="reviews">

                    {
                        (this.state.showG && this.state.posts !== null && this.state.posts !== undefined) ?
                            <div>
                                {this.createTable(this.state.posts)}
                            </div> :
                            <div> Здесь будут аннотации</div>
                    }

                </div>


            </div>

            </div>

        );
    }
}