import React from 'react';
import './Articles.css'
import axios from "axios";

class Articles extends React.Component {

    constructor({location}) {
        super({location});

        this.state = {
            idFilm: location.state.idFilm,
            articles: [],
            name: ""
        };

        this.getArticles = this.getArticles.bind(this);
        this.getArticles();

        this.filmInformation = this.filmInformation.bind(this);
        this.filmInformation();
    }

    filmInformation() {
        let params = new URLSearchParams();
        params.append('film_id', this.state.idFilm);
        axios.get('http://localhost:8080/getMainInfoOfTehFilm', {
            withCredentials: true,
            params
        })
            .then(res => {
                if (res.status !== 401) {
                    this.setState({name: res.data.name});
                }
            }).catch(err => {
            alert(err);
            return false;
        });
    }

    getArticles() {
        let params = new URLSearchParams();
        params.append('film_id', this.state.idFilm);
        axios.get('http://localhost:8080/findTheMostInterestingAnnotation', {
            withCredentials: true,
            params
        })
            .then(res => {
                if (res.status !== 401) {
                    this.setState({articles: res.data});
                }
            }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div>
                <div id="art">
                    <div id="name_art">{this.state.name}</div>
                    {this.state.articles.map(
                        article => {
                            return (
                                <div>
                                    <div className="article_list">
                                        <div className="name_analyst">Аналитик: {article.name}</div>
                                        <div className="wrapper">
                                            <label htmlFor={article.name}>Read more...</label>
                                            <input type="checkbox" id={article.name}/>
                                            <div className="xpandable-block">
                                                <p>
                                                    {article.body}<br/>
                                                    <div className="name_analyst">Оценка: {article.score}</div>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    )}
                </div>
            </div>
        );
    }


}

export default (Articles);