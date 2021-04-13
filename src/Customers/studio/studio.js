import React, {Component} from 'react';
import axios from "axios";
import GalleryStudio from "../../components/parts/galeryStudio";
import "./studio.css"


export default class Studio extends React.Component {

    constructor({location}) {
        super();
        this.state = {
            nick: "big",
            showG: false,
            f: false,
            showMenu: false,
            score: '',
            marc: null,
            marcSend: null,
            posts: [],
            arr1: [],
            gallery: [],
            films: [],
            photo: '',
            sub: false,
        };
        this.testSession = this.testSession.bind(this);
        this.testSession();
        this.handleChange = this.handleChange.bind(this);
        this.marcSubmit = this.marcSubmit.bind(this);
        this.setsubSubmit = this.setsubSubmit.bind(this);
        this.remsubSubmit = this.remsubSubmit.bind(this);
    }

    testSession() {

        let params = new URLSearchParams();
        params.append('nick', this.state.nick);
        axios.post('http://localhost:8080/getLogo', params, {withCredentials: true})
            .then(res => {
                if (res.status !== 401) {
                    this.setState({photo: res.data});
                }
                else return false;
            }).catch(err => {
        });
        axios.post('http://localhost:8080/studioScore', params, {withCredentials: true}).then(
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

        axios.post('http://localhost:8080/studioPosts', params, {withCredentials: true}).then(
            res => {
                if (res.status !== 401) {
                    this.setState({posts: res.data});
                    return true;
                }
            }
        ).catch(err => {
            console.log("posts" + err);
            return false;
        });

        axios.post('http://localhost:8080/studioFilms',
            params, {withCredentials: true}).then(res => {
            if (res.status === 200) {
                this.setState({films: res.data});
                this.state.f = true;
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
                    console.log(this.state.marc);
                    this.setState({showG: true});
                    return true;
                }
            }
        ).catch(err => {
            console.log("marc" + err);
            return false;
        });

        axios.post('http://localhost:8080/getStudioPhotos',
            params, {withCredentials: true}).then(res => {
            if (res.status === 200) {
                this.setState({gallery: res.data});

                return true;
            }
        }).catch(err => {
            console.log(err);
        });


    }

    filmTable(arr1) {

        let table = [];
        let length = length;

        if (length === 0) {
            table.push(
                <div>пока ниего нет</div>
            )

        } else {
            for (let i = 0; i < length; i++) {
                table.push(
                    <p>{arr1[i].name}</p>
                )
            }
        }
        return table
    }


    createTable(arr1) {
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
                            border: 'none',
                            borderRadius:'10px'
                        }}>
                            <p>{arr1[i].body}</p>

                            <div style={{
                                borderRadius:'10px'
                            }}><img id="postPhoto" src={arr1[i].img} /></div>
                            <p>___________________________________________________________________</p>
                        </div>
                        <br/>
                    </div>
                )
            }
        }
        return table
    }

    handleChange(e) {
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
        return (
            <div className="pageStudio">

                <div id ="Foll"> посты

                    <div>

                        {
                            (this.state.showG && (this.state.posts !== null && this.state.posts !== undefined)) ?
                                <div>
                                    {this.createTable(this.state.posts)}
                                </div> :
                                <div> Здесь будут ваши посты</div>
                        }
                    </div>

                </div>

                <div id="header">
                    <div id="pic">
                        <img className="ico" src={this.state.photo}/>
                        <p>{this.state.nick}</p>
                    </div>

                    <div>
                        {
                            !(this.state.sub) ?
                                <div>
                                    <form onSubmit={this.setsubSubmit}>
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
                                    <form onSubmit={this.remsubSubmit}>
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
                        <p> рейтинг {this.state.score}</p>
                    </div>

                    <div>
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

                    <GalleryStudio nick={this.state.nick}/>
                    <br/>

                    <div>
                        фильмы
                        {
                            ((this.state.f) && (this.state.films !== null && this.state.films !== undefined))
                                ?
                                <div className="gallery">
                                    {this.filmTable(this.state.films)}
                                </div>
                                :
                                <div className="gallery">

                                </div>


                        }

                    </div>

                </div>

            </div>


        );
    }
}