import React from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import article from "./img/article.png";
import votes from "./img/vote.png";
import score from "./img/score.png";
import './Film.css';
import Chat from "../Chat";


class Film extends React.Component {

    constructor({location}) {
        super({location});

        this.state = {
            idFilm: location.state.idFilm,
            studio: [],
            actors: [],
            test: [],
            review: [],
            info: "",
            score: "",
            putScore: 0,
            chooseScore: false
        };

        this.filmInformation = this.filmInformation.bind(this);
        this.filmInformation();

        this.filmReview = this.filmReview.bind(this);

        this.setUserScore = this.setUserScore.bind(this);
        this.onChange = this.onChange.bind(this);
        this.sendUserScore = this.sendUserScore.bind(this);
        this.actors = this.actors.bind(this);
        this.studio = this.studio.bind(this);
    }

    onChange(e) {
        let value = e.target.value;
        if (value <= 100 && value >= 0) this.setState({putScore: value});
    }

    setUserScore() {
        this.setState({chooseScore: true})
    }

    sendUserScore(e) {
        e.preventDefault();
        let params = new URLSearchParams();
        params.append('id_film', this.state.idFilm);
        params.append('score', this.state.putScore);
        fetch('http://localhost:8080/setScoreFilm', {
            method: 'POST',
            credentials: 'include',
            body: params
        }).then(res => {
            if (res.status !== 401) {
                this.filmInformation()
            }
        }).catch(err => {
            console.log(err);
        });
    }

    filmInformation() {
        let params = new URLSearchParams();
        params.append('film_id', this.state.idFilm);//this.props.info
        axios.get('http://localhost:8080/getMainInfoOfTehFilm', {
            withCredentials: true,
            params
        })
            .then(res => {
                if (res.status !== 401) {
                    this.setState({info: res.data});
                    this.arrayOfPhoto();
                    this.filmReview();
                    this.actors();
                    this.studio();
                    if (res.data.userScore === 0) this.setState({score: true});
                    else this.setState({score: false});
                }
            }).catch(err => {
            alert(err);
            return false;
        });
    }

    filmReview() {
        const url = 'http://localhost:8080/findTheMostInterestingAnnotation?film_id=' + this.state.idFilm;
        fetch(url, {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                this.setState({review: [data[0], data[1], data[2]]});
            });
    }

    arrayOfPhoto() {
        let params = new URLSearchParams();
        params.append('film_id', this.state.idFilm);
        return axios.get('http://localhost:8080/getPhotosAsString', {
            withCredentials: true,
            params
        })
            .then(res => {
                if (res.status !== 401) {
                    this.setState({test: res.data})
                }
            }).catch(err => {
                alert(err);
            });
    }

    actors() {
        let params = new URLSearchParams();
        params.append('id_film', this.state.idFilm);
        return axios.get('http://localhost:8080/getActorsForFilm', {
            withCredentials: true,
            params
        })
            .then(res => {
                if (res.status !== 401) {
                    this.setState({actors: res.data});
                }
            }).catch(err => {
                alert(err);
            });
    }

    studio() {
        let params = new URLSearchParams();
        params.append('id_film', this.state.idFilm);
        return axios.get('http://localhost:8080/getStudioForFilm', {
            withCredentials: true,
            params
        })
            .then(res => {
                if (res.status !== 401) {
                    this.setState({studio: res.data});
                }
            }).catch(err => {
                alert(err);
            });
    }

    render() {
        if (this.state.info) {
            return (
                <div>
                    <div className="name">
                        {this.state.info.name}
                    </div>

                    <div className="rank">
                        <div className="number">{this.state.info.score}%</div>
                        <div>Рейтинг фильма</div>
                    </div>

                    <div className="mainInfo">
                        {this.state.info.body}
                    </div>
                    <div className="picture">
                        <img className="img" id="mainPic" src={this.state.test[0]} alt="иллюстрация"/>
                    </div>
                    <div className="manyPic">
                        <img className="img imgSmall" src={this.state.test[1]} alt="иллюстрация"/>
                        <img className="img imgSmall" src={this.state.test[2]} alt="иллюстрация"/>
                        <img className="img imgSmall" src={this.state.test[3]} alt="иллюстрация"/>
                        <img className="img imgSmall" src={this.state.test[4]} alt="иллюстрация"/>
                        <img className="img imgSmall" src={this.state.test[5]} alt="иллюстрация"/>
                    </div>
                    <div className="scoreAndArticle">
                        <div className="yourScore">
                            <div>Ваша оценка</div>

                            {this.state.score ?
                                <div>
                                    {this.state.chooseScore ?
                                        <div>
                                            <form id="score_user_form" onSubmit={this.sendUserScore}>
                                                <input type="number"
                                                       onChange={this.onChange}
                                                       value={this.state.putScore}
                                                       placeholder="введите оценку [0;100]" id="score_user_content"
                                                       required/>
                                                <button id="score_user_button" className="buttons"
                                                        type="submit">отправить
                                                </button>
                                            </form>
                                        </div>
                                        : <button id="send_score_button" onClick={this.setUserScore}>
                                            <img id="score_pic" src={score} alt="иллюстрация"/>
                                        </button>}

                                </div>
                                :
                                <div className="circle">
                                    <div className="number"> {this.state.info.userScore}</div>
                                </div>}

                        </div>

                        {
                            this.state.review.map(
                                review => {
                                    return (
                                        <div className="article">
                                            <div className="number">
                                                {review.score}%
                                            </div>
                                            <div className="wrapper">
                                                <label htmlFor={review.name}>Read more...</label>
                                                <input type="checkbox" id={review.name}/>
                                                <div className="xpandable-block_film">
                                                    <p>{review.body}<br/>
                                                        <div className="name_analyst">
                                                            Аналитик: {review.name}
                                                        </div>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            )
                        }
                    </div>
                    <div id="links">
                        <div className="chat link">
                            Перейти в групповой чат по фильму<br/>
                            <Chat idFilm={this.state.idFilm} locate="1"/>
                        </div>
                        <div className="vote link">
                            Перейти к голосованием<br/>
                            {/*{{pathname: "/vote", state: {idFilm: this.state.idFilm}}}*/}
                            <Link to={{pathname: "/votes", state: {idFilm: this.state.idFilm}}}>
                                <img className="imgDes" src={votes} alt="иллюстрация"/>
                            </Link>
                        </div>
                        <div className="anotherArticle link">
                            Развернуть все статьи аналитиков<br/>
                            <Link to={{pathname: "/articles", state: {idFilm: this.state.idFilm}}}>
                                <img className="imgDes" src={article} alt="иллюстрация"/>
                            </Link>
                        </div>
                    </div>

                    <div id="studiosAndActors">
                        Производитель-студия:
                        {/*<div className="goo">{this.state.studio}</div>*/}
                        {this.state.studio.map(
                            studio => {
                                return (
                                    <div className="goo">
                                        <Link to={{pathname: '/StudioPage', state: {nick: studio.login}}}>{studio.name}</Link>
                                    </div>
                                )
                            }
                        )}
                        <br/>
                        Актерский состав: {this.state.actors.map(
                        actor => {
                            return (
                                <div className="goo">
                                    <Link to={{pathname: '/actorPage', state: {nick: actor.login}}}>{actor.name}</Link>
                                </div>
                            )
                        }
                    )}
                    </div>
                </div>

            );
        } else {
            return (
                <div>
                    <div>
                        <h1>You are already logged</h1>
                        <div className="buttonHolder">
                            <button onClick={this.logout}>Logout</button>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default (Film);