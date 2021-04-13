import React, {Component} from 'react';
import axios from "axios";
import "./home.css"
import GalleryHome from "../../components/parts/galleryActor";


export default class Actor extends React.Component {

    constructor({props}) {
        super(props);
        this.state = {
            nick: window.sessionStorage.getItem('nick'),
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
            value: 0
        };
        this.testSession = this.testSession.bind(this);
        this.testSession();

        this.marcSubmit = this.marcSubmit.bind(this);
        this._handleChange = this._handleChange.bind(this);


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
                this.state.showG = true;
                console.log("film");
                console.log(this.state.showG);
                return true;
            }
        }).catch(err => {
            console.log(err);
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
console.log("massiv dlia posta"+arr1);
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


    render() {
        const {value} = this.state;
        return (
            <div className="page" style={{
                width: '1000px',
                height: '100%'
            }}>

                <div id="actorFoll">
                    <p>followers {this.state.count}</p>


                    <div id="postActor">
                        {
                            (true)
                                ? (
                                    <div>
                                        {this.create(this.state.posts)}
                                    </div>
                                )
                                : (
                                    <div>
                                        тут будут ваши посты
                                    </div>
                                )
                        }

                    </div>
                </div>

                <div id="header" style={{
                    width: '300px'
                }}>

                    <div id="pic">
                        <img id="ico" src={this.state.photo}/>
                        <p>{this.state.nick}</p>
                    </div>

                    <div id="actorScore">
                        <p> рейтинг {this.state.score}
                        </p>
                    </div>


                    <GalleryHome nick={this.state.nick}/>
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