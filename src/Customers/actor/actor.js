import React, {Component} from 'react';
import axios from "axios";
import "./actor.css"
import Gallery from "../../components/parts/galery";


export default class Test extends React.Component {

    constructor({location}) {
        super();
        this.state = {
            nick: location.state.nick,
            showG: false,
            showMenu: false,
            score: '',
            marc: null,
            marcSend: null,
            posts: [],
            photo: '',
            count: '',
            arr: [],
            films: [],
            value: 0,
            sub: false,
        };
        this.testSession = this.testSession.bind(this);
        this.testSession();

        this.marcSubmit = this.marcSubmit.bind(this);
        this._handleChange = this._handleChange.bind(this);

        this.setsubSubmit = this.setsubSubmit.bind(this);
        this.remsubSubmit = this.remsubSubmit.bind(this);
    }

    testSession() {

        let params = new URLSearchParams();
        params.append('nick', this.state.nick);

        axios.post('http://localhost:8080/getLogo', params, {withCredentials: true}).then(
            res => {
                if (res.status !== 401) {
                    this.setState({photo: res.data});
                    return true;
                }
            }
        ).catch(err => {
            console.log("score" + err);
            return false;
        });

        axios.post('http://localhost:8080/follCount', params, {withCredentials: true}).then(
            res => {
                if (res.status !== 401) {
                    this.setState({count: res.data});
                    return true;
                }
            }
        ).catch(err => {
            return false;
        });

        axios.post('http://localhost:8080/actorScore', params, {withCredentials: true}).then(
            res => {
                if (res.status !== 401) {
                    this.setState({score: res.data});
                    return true;
                }
            }
        ).catch(err => {
            return false;
        });

        axios.post('http://localhost:8080/actorPosts', params, {withCredentials: true}).then(
            res => {
                if (res.status !== 401) {
                    this.setState({posts: res.data});
                    console.log(this.state.posts);
                    console.log("post G");
                    console.log(this.state.showG);

                    return true;
                }
            }
        ).catch(err => {
            console.log("posts" + err);
            return false;
        });

        axios.post('http://localhost:8080/actorFilms',
            params, {withCredentials: true}).then(res => {
            if (res.status === 200) {
                this.setState({films: res.data});
                console.log("film");
                this.setState({showG: true});
                console.log(this.state.showG);
                return true;
            }
        }).catch(err => {
            console.log(err);
        });

        axios.get('http://localhost:8080/getSub', {
            params: {
                nick: this.state.nick,
            }, withCredentials: true
        }).then(
            res => {
                if (res.status !== 401) {
                    this.setState({sub: res.data});
                    return true;
                }
            }
        ).catch(err => {
            console.log("marc" + err);
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

                    console.log(this.state.showG);
                    console.log(this.state.marc);
                    return true;
                }
            }
        ).catch(err => {
            console.log("marc" + err);
            return false;
        });

    }

    filmTable(arr1) {
        let table = [];
        let length = arr1.length;
        if (length === 0) {
            table.push(<div>пока ничего нет</div>)
        } else {

            for (let i = 0; i < length; i++) {
                table.push(
                    <p>{arr1[i].name}</p>
                )
            }
        }
        return table
    }


    create(arr1) {
        let table = [];
        let length = arr1.length;
        if (length === 0) {
            table.push(<div>пока ничего нет</div>)
        } else {
            for (let i = 0; i < length; i++) {
                table.push(
                    <div>

                        <div style={{
                            width: '600px',
                            border: 'none'
                        }}>
                            <p>{arr1[i].body}</p>

                            <div><img id="postPhoto" src={arr1[i].img} style={{}}/></div>
                            <p>___________________________________________________________________________</p>
                        </div>
                        <br/>
                    </div>
                )
            }
        }
        return table
    }

    handleChange = value => {
        console.log(`Changed value ${value}`);
        this.setState({value});
    };

    _handleChange(e) {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value})
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

    setsubSubmit(e) {
        e.preventDefault();
        axios.get('http://localhost:8080/setSub', {
            params: {
                nick: this.state.nick,
            }, withCredentials: true
        })
            .then(res => {
                if (res.status !== 401) {
                    this.setState({sub: res.data});

                }
                else return false;
            }).catch(err => {
            console.log('ошибка в вас');
        });
    }

    remsubSubmit(e) {
        e.preventDefault();

        axios.get('http://localhost:8080/remSub', {
            params: {
                nick: this.state.nick,
            }, withCredentials: true
        })
            .then(res => {
                if (res.status !== 401) {
                    this.setState({sub: res.data});

                }
                else return false;
            }).catch(err => {
            console.log('ошибка в вас');
        });

    }


    render() {
        const {value} = this.state;
        return (
            <div className="page" style={{
                width: '1000px'
            }}>

                <div id="actorFoll">
                    <p>followers {this.state.count}</p>


                    <div id="postActor">

                        {
                            (this.state.showG && this.state.posts !== null && this.state.posts !== undefined)
                                ? (
                                    <div>
                                        {this.create(this.state.posts)}
                                    </div>
                                )
                                : (
                                    <div>
                                        тут будут посты
                                    </div>
                                )
                        }

                    </div>
                </div>

                <div id="header" style={{
                    width: '200px'
                }}>

                    <div id="pic">
                        <img id="ico" src={this.state.photo}/>
                        <p>{this.state.nick}</p>
                    </div>

                    <div id="actorScore">
                        <p> рейтинг {this.state.score}
                        </p>
                    </div>

                    <div>
                        {
                            !(this.state.sub) ?
                                <div>
                                    <form id="formochka" onSubmit={this.setsubSubmit}>
                                        <button type="submit" style={{
                                            width: '100px',
                                            height: '25px',
                                            color: 'white',
                                            background: 'black',
                                            border: 'none'
                                        }}>подписаться
                                        </button>
                                    </form>
                                </div>
                                :
                                <div>
                                    <form id="formochka" onSubmit={this.remsubSubmit}>
                                        <button style={{
                                            width: '100px',
                                            height: '25px',
                                            color: 'white',
                                            background: 'black',
                                            border: 'none'
                                        }}>отписаться
                                        </button>
                                    </form>
                                </div>
                        }

                    </div>

                    <div>
                        ваша оценка
                        {(this.state.marc === null || this.state.marc === 0) ?
                            <form id="marcForm" onSubmit={this.marcSubmit}>
                                <input type="text" name="marcSend" value={this.state.marcSend}
                                       onChange={this._handleChange} required placeholder="оценочка(0-100)"/>
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

                    <Gallery nick={this.state.nick}/>
                    <br/>

                    <div>Фильмы:
                        {
                            (this.state.showG && this.state.films !== null && this.state.films !== undefined)
                                ?
                                <div id="films">
                                    {this.filmTable(this.state.films)}
                                </div>

                                :
                                <div id="films">

                                </div>

                        }

                    </div>

                </div>


            </div>


        );
    }
}