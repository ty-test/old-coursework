import React, {Component} from 'react';
import axios from "axios";
import Select from 'react-select';
import GalleryStudioHome from "../../components/parts/galleryStudioHome";
import "./studio.css"

export default class StudioHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nick: window.sessionStorage.getItem('nick'),
            showG: false,
            showM: false,
            f: false,
            showMenu: false,
            score: '',
            posts: [],
            arr1: [],
            gallery: [],
            films: [],
            mail: [],
            selected: '',
            actors: [],
            selectedActor: ''
        };

        console.log("nick home" + this.state.nick);

        this.testSession = this.testSession.bind(this);
        this.testSession();

        this.showM = this.showM.bind(this);
        this.closeM = this.closeM.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

    }


    showM(event) {

        this.setState({showM: true})
    }

    closeM(event) {
        this.setState({showM: false});
    }

    testSession() {

        axios.get('http://localhost:8080/get', {withCredentials: true})
            .then(res => {
                if (res.status !== 401) {
                    this.setState({arr1: res.data});
                }
                else return false;
            }).catch(err => {
        });

        let params = new URLSearchParams();
        params.append('nick', this.state.nick);

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

        axios.post('http://localhost:8080/actors',
            params, {withCredentials: true}).then(res => {
            if (res.status === 200) {
                this.setState({actors: res.data});
                return true;
            }
        }).catch(err => {
            console.log(err);
        });

        axios.get('http://localhost:8080/myMail', {withCredentials: true})
            .then(res => {
                if (res.status !== 401) {
                    this.setState({mail: res.data});
                    console.log(this.state.mail);
                    this.setState({showG: true});
                }
                else return false;
            }).catch(err => {
        });
    }

    filmTable(arr1) {

        let table = [];
        let length = arr1.length;

        if (length === 0) {
            table.push(
                <div>пока ничего нет
                </div>)
        } else {
            for (let i = 0; i < length; i++) {
                table.push(
                    <p>{arr1[i].name}</p>
                )
            }
        }
        return table
    }


    createMail(arr1) {
        let table = [];
        let length = arr1.length;
        console.log(length);

        if (length === 0) {
            table.push(<div>пока ничего нет
            </div>)
        } else {

            for (let i = 0; i < length; i++) {
                table.push(
                    <div>
                        <div style={{
                            width: '600px',
                            color: 'white',
                            background: 'black',
                            border: 'none',
                            borderRadius: '5px',
                        }}>

                            <p>Фильм: {arr1[i].filmName}</p>
                            <p>Сумма: {arr1[i].sum}</p>
                            {(arr1[i].agree) ?
                                <p>Принято</p> :
                                <p style={{color: 'grey'}}>
                                    Отклонено</p>}


                        </div>
                        <br/>
                    </div>
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
                            borderRadius: '10px'
                        }}>
                            <p>{arr1[i].body}</p>

                            <div style={{
                                borderRadius: '10px'
                            }}><img id="postPhoto" src={arr1[i].img}/></div>
                            <p>___________________________________________________________________</p>
                        </div>
                        <br/>
                    </div>
                )
            }
        }
        return table
    }

    handleSubmit(e) {
        e.preventDefault();

        let params = new URLSearchParams();
        params.append('film', this.state.selected);
        params.append('actor', this.state.selectedActor);
        axios.post('http://localhost:8080/addActor', params, {withCredentials: true}).then(
            response => {
                if (response.status === 200) {
                    console.log("worked");
                    alert("Добавлен :)")
                    // window.location.reload(true);
                }
            }
        ).catch(err => {
            console.log(err);
            return false;
        });

    }

    handleChangeF = (e) => {
        this.state.selected = e.value;
    }
    handleChangeA = (e) => {
        this.state.selectedActor = e.value;
    }

    render() {
        const logChange = (val) => {
            this.state.selected = [];
            this.state.selected = (typeof val, val);
        };

        const selectX = this.state.films.map(g => ({
            value: g.id,
            label: g.name

        }));

        const _logChange = (val) => {
            this.state.selectedActor = [];
            this.state.selectedActor = (typeof val, val);
        };

        const selectA = this.state.actors.map(g => ({
            value: g.id,
            label: g.name

        }));
        return (
            <div className="pageStudio">
                <div id="header">
                    <div id="pic">
                        <img id="ico" src={this.state.arr1.profileImageUrl}/>
                        <p>{this.state.arr1.name}</p>
                    </div>

                    <div>
                        <p>ваша оценочка {this.state.score}</p>
                    </div>

                    <GalleryStudioHome nick={this.state.nick}/>

                    <div>
                        <a onClick={this.showM}> почта</a>


                        {
                            (this.state.showM && (this.state.mail !== null && this.state.mail !== undefined)) ?
                                <div>
                                    <a onClick={this.closeM}>закрыть</a>
                                    {this.createMail(this.state.mail)}
                                </div> : <p></p>
                        }

                    </div>

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

                <div id="Foll">

                    <div>
                        Добавить актера к вашему фильму
                        <br/>
                        <form id="selectorDiv" onSubmit={this.handleSubmit}>

                                <Select
                                    name="colors"
                                    options={selectX}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    placeholder="select your film"
                                    onChange={this.handleChangeF}
                                />

                                <Select
                                    name="colors"
                                    options={selectA}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    placeholder="select actor"
                                    onChange={this.handleChangeA}
                                />

                            <button className="submitButton"
                                    type="submit"
                            style={{width:'300px',
                            border:'none'}}>Добавить
                            </button>

                        </form>
                    </div>
                    <br/>

                    <div>посты
                        <br/>

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
                </div>
            </div>


        );
    }
}