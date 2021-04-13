import React from 'react';
import axios from "axios";
import './MiniFilm.css'
import {Link} from "react-router-dom";
import Chat from "../Chat";


class MiniFilm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            test: [],
            review: [],
            filmInfo: "",
            info: "",
            article: false
        };

        this.filmInformation = this.filmInformation.bind(this);
        this.filmInformation();

        this.filmReview = this.filmReview.bind(this);
        this.filmReview();

    }

    filmInformation() {
        let params = new URLSearchParams();
        params.append('film_id', this.props.agree);
        axios.get('http://localhost:8080/getMainInfoOfTehFilm', {
            withCredentials: true,
            params
        })
            .then(res => {
                if (res.status !== 401) {
                    console.log("отправленно");
                    // this.props.setInfo(res.data);
                    this.setState({info: res.data});
                    this.arrayOfPhoto();
                    console.log(res);
                }
            }).catch(err => {
            console.log(err);
            return false;
        });
    }

    filmReview() {
        let film_id = this.props.agree;
        const url = 'http://localhost:8080/findTheMostInterestingAnnotation?film_id=' + film_id;
        fetch(url, {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                if (data != null) this.setState({article: true});
                this.setState({review: [data[0], data[1], data[2]]});
                console.log(url);
            });
    }

    arrayOfPhoto() {
        let params = new URLSearchParams();
        params.append('film_id', this.props.agree);
        return axios.get('http://localhost:8080/getPhotosAsString', {
            withCredentials: true,
            params
        })
            .then(res => {
                if (res.status !== 401) {
                    console.log(res.data);
                    this.setState({test: res.data})
                }
            }).catch(err => {
                alert(err);
            });
    }

    render() {
        if (this.state.info) {
            return (
                <div>
                    <div id="link_to_film">
                        <Link to={{pathname: "/film", state: {idFilm: this.props.agree}}}>
                            <div className="nameMini">{this.state.info.name}</div>
                        </Link></div>
                    <img id="mainPicMini" src={this.state.test[0]} alt="иллюстрация"/>

                    <div className="rankMini">
                        <div className="numberMini circleMini">{this.state.info.score}</div>
                        <div>Рейтинг фильма</div>
                    </div>

                    <div className="yourScoreMini">
                        <div>Ваша оценка</div>
                        <div className="circleMini">
                            {(typeof this.state.info.userScore !== "undefined") ?
                            <div className="numberMini">{this.state.info.userScore}</div>
                                :
                            <div className="numberMini">Nope</div>
                            }
                        </div>
                    </div>


                    <Chat idFilm={this.props.agree} locate="0"/>

                    <div id="mainInfoTitleMini">Основная информация</div>
                    <div className="mainInfoMini">{this.state.info.body} </div>

                    {this.state.article ? <div>
                        {this.state.review.map(
                            review => {
                                return (
                                    <div className="article_mini">
                                        {(typeof review !== "undefined") ?
                                            <div>
                                                <div className="numberMini">
                                                    {(typeof review !== "undefined") ?
                                                        review.score : null}
                                                </div>
                                                <div className="wrapper">
                                                    <label htmlFor={review.name}>...</label>
                                                    <div className="xpandable-block_film">
                                                        <p>{review.body}<br/>
                                                            Аналитик: {review.name}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div> : <div>
                                                <div className="numberMini">
                                                    {(typeof review !== "undefined") ?
                                                        review.score : null}
                                                </div>
                                                <div className="wrapper">
                                                    <div className="xpandable-block_film">
                                                        <p>КТО ПРОЧИИИТАЛ ТОТ ЗДОХНЕТ<br/>
                                                        скоро появятся аннотации
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>


                                        }
                                    </div>
                                )
                            }
                        )}
                    </div> : null}

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

export default (MiniFilm);