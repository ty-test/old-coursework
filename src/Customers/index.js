import React, {Component} from 'react';
import axios from "axios";

import User from "../components/user";
import "./customer.css"
import Select from 'react-select';
import UsActor from "./actor/usActor";
import UsAnalyst from "./analyst/usAnalyst";
import UsStudio from "./studio/UsStudio";
import ComplaintSupport from "../components/ComplaintSupport"
import MiniFilm from "../components/MiniFilm";

export default class Customer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            nick: window.sessionStorage.getItem('nick'),
            name: 'машуля',
            x: '',
            role: '',
            genres: [],
            newArray: [],
            recommendArray: [],
            popularArray: [],
            genreArray: [],
            agree: "",
            a: [{'id': 1}, {'id': 2}, {'id': 3}],
            test: false
        };

        this.testSession = this.testSession.bind(this);
        this.testSession();

        this.testArray = this.testArray.bind(this);
        this.testArray();

        this.getFilmsWithChoosenGenre = this.getFilmsWithChoosenGenre.bind(this);

        this.getNewFilms = this.getNewFilms.bind(this);

        this.getRecommend = this.getRecommend.bind(this);

        this.getPopularFilms = this.getPopularFilms.bind(this);

    }

    handleChangeX = (selectedOption) => {
        this.setState({x: selectedOption.value});
        this.getFilmsWithChoosenGenre(selectedOption.value);
    };


    testArray() {
        this.state.newArray = [{'id': 1}, {'id': 2}, {'id': 3}]
    }


    testSession() {
        axios.get('http://localhost:8080/role', {withCredentials: true})
            .then(res => {
                if (res.status !== 401) {
                    this.setState({role: res.data});
                    if (res.data === 4)  window.location.assign("/complaintSupport");
                    console.log(this.state.role);
                    this.props.setAuthorised();
                    return true;
                }
            }).catch(err => {
            return false;
        });


        axios.get('http://localhost:8080/genres', {withCredentials: true})
            .then(res => {
                if (res.status !== 401) {
                    this.setState({genres: res.data});
                    console.log(this.state.genres);
                    return true;
                }
            }).catch(err => {
            return false;
        });

        axios.get('http://localhost:8080/getNew', {withCredentials: true})
            .then(res => {
                if (res.status !== 401) {
                    this.setState({newArray: res.data});
                    console.log(this.state.newArray);
                    return true;
                }
            }).catch(err => {
            return false;
        });
    }

    getFilmsWithChoosenGenre(str) {
        let params = new URLSearchParams();
        params.append('genre', str);
        axios.get('http://localhost:8080/getGenreFilms', {
            params,
            withCredentials: true
        })
            .then(res => {
                if (res.status !== 401) {
                    console.log("Фильмы с выбранным жанром");
                    console.log(res.data);
                    this.setState({a: res.data});
                    this.setState({test: !this.state.test});
                    return true;
                }
            }).catch(err => {
            return false;
        });
    }

    getNewFilms() {
        axios.get('http://localhost:8080/getNew', {
            withCredentials: true
        })
            .then(res => {
                if (res.status !== 401) {
                    console.log("Новые фильмы");
                    this.setState({a: res.data});
                    this.setState({test: !this.state.test});
                    console.log(this.state.a);
                    return true;
                }
            }).catch(err => {
            return false;
        });
    }

    getPopularFilms() {
        axios.get('http://localhost:8080/getPopularFilms', {
            withCredentials: true
        })
            .then(res => {
                if (res.status !== 401) {
                    console.log("Популярные фильмы:");
                    this.setState({a: res.data});
                    this.setState({test: !this.state.test});
                    console.log(this.state.a);
                    return true;
                }
            }).catch(err => {
            return false;
        });
    }

    getRecommend() {
        axios.get('http://localhost:8080/filmsForRecommend', {
            withCredentials: true
        })
            .then(res => {
                if (res.status !== 401) {
                    console.log("Популярные фильмы:");
                    this.setState({a: res.data});
                    this.setState({test: !this.state.test});
                    console.log(this.state.a);
                    return true;
                }
            }).catch(err => {
            return false;
        });
    }

    // getRecommendFilmsForStart() {
    //     axios.get('http://localhost:8080/filmsForRecommend', {
    //         withCredentials: true
    //     })
    //         .then(res => {
    //             if (res.status !== 401) {
    //                 return res.data;
    //             }
    //         }).catch(err => {
    //         return null;
    //     });
    // }

    mail(arr1) {
        // alert(this.state.nick);
        let table = [];
        let length = arr1.length;
        // console.log("intoooo");
        for (let i = 0; i < length; i++) {
            this.state.agree = arr1[i].id;
            table.push(
                <MiniFilm agree={this.state.agree} userName={this.state.nick}/>
            )
        }

        return table;
    }

    chooseComponent(x) {
        let component = [];
        switch (x) {
            case 0:
                component.push(
                    <User history={this.history}/>
                );
                break;

            case 1:
                component.push(<UsActor history={this.history}/>);
                break;
            case 2:
                component.push(<UsAnalyst history={this.history}/>);
                break;
            case 3:
                component.push(<UsStudio history={this.history}/>);
                break;
            case 4:
                window.location.assign("/complaintSupport");
                // browserHistory.push("/path-to-link");
                // this.win.push("/complaintSupport");
                break;

            default:

                break;
        }

        return component
    }

    getFilmsGanre() {


    }

    //TODO открывать страницу редактирования как форму регистрации/логина как в лабе игоряКирила

    render() {
        const selectX = this.state.genres.map(g => ({
            value: g.name,
            label: g.name

        }));


        return (
            <div className="frame">
                <div className="bar">
                    <button onClick={this.getNewFilms}>Новое</button>
                    <button onClick={this.getRecommend}>Рекомендуем</button>
                    <button onClick={this.getPopularFilms}>Популярное</button>
                </div>
                <div className="select">
                    <Select className="genre" placeholder={'Жанр'}
                            onChange={this.handleChangeX}
                            options={selectX}
                            theme={(theme) => ({
                                ...theme,
                                borderRadius: 0,
                                colors: {
                                    ...theme.colors,
                                    primary25: 'dimgrey',
                                    // primary: 'black',
                                    neutral0: 'black',
                                    neutral20: 'white',
                                    neutral50: 'white',
                                    neutral80: 'white',
                                },
                            })}
                            value={this.state}
                    /></div>

                {this.chooseComponent(this.state.role)}

                <div id="user_news">
                    {this.state.test ?
                        <div className="agreeAll id_block_film">
                            {
                                this.state.a.map(film => {
                                    return (
                                        <MiniFilm agree={film.id} userName={this.state.nick}/>)
                                })
                            }
                        </div>
                        :
                        <div className="agreeAll id_block_film">
                            {
                                this.state.a.map(film => {
                                    return (
                                        <MiniFilm agree={film.id} userName={this.state.nick}/>)
                                })
                            }
                            <div id="secret">a</div>
                        </div>
                    }
                </div>

            </div>


        );
    }
}