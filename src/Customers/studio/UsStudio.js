import React from "react";
import axios from "axios";
import "../../components/componentCSS/user.css"

import but from "../../components/pictures/settings.PNG";
import home from "../../components/pictures/Home.png"
import PostSend from "../../components/parts/postSend";
import Set from "../../components/parts/settings";
import ImageUpload from "../../components/parts/image";
import Gallery from "../../components/parts/galery";
import FollowersStudio from "../../components/parts/followersStud";
import GalleryStudioHome from "../../components/parts/galleryStudioHome";

class UsStudio extends React.Component {
    constructor(props) {
        super(props);

        this.state =
            {
                nick: window.sessionStorage.getItem('nick'),
                showG: false,
                showMenu: false,
                arr: [],
                arr1: [],
                followers: [],
                score: ''
            };

        console.log("nick" + this.state.nick);

        this.testSession = this.testSession.bind(this);
        this.testSession();

        this.imgs = this.imgs.bind(this);
        this.imgs();

        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);

        this.logout = this.logout.bind(this);

        this.home = this.home.bind(this);

    }

    testSession() {

        axios.get('http://localhost:8080/get', {withCredentials: true})
            .then(res => {
                if (res.status !== 401) {
                    this.setState({arr1: res.data});
                    console.log("картинка" + this.state.arr1);

                } else return false;
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

        axios.post('http://localhost:8080/studioFollowers',
            params, {withCredentials: true}).then(res => {
            if (res.status === 200) {
                this.setState({followers: res.data});
                return true;
            } else return false;
        }).catch()
    }

    logout() {
        axios.post('http://localhost:8080/logout', {withCredentials: true});
        //this.props.history.push();
        window.location.href = '/';
        //TODO чистить nick
    }

    home() {
        window.location = '/studio';
    }

    showMenu(event) {
        event.preventDefault();

        this.setState({showMenu: true}, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }

    closeMenu(event) {

        if (!this.dropdownMenu.contains(event.target)) {

            this.setState({showMenu: false}, () => {
                document.removeEventListener('click', this.closeMenu);
            });

        }
    }

    imgs() {

        let params = new URLSearchParams();
        params.append('nick', this.state.nick);

        axios.post('http://localhost:8080/getStudioPhotos',
            params, {withCredentials: true}).then(res => {
            if (res.status === 200) {
                this.setState({followers: res.data});
                this.setState({showG: true});

                console.log("galery" + this.state.arr);
                return true;
            }
        }).catch(err => {
            console.log(err);
        });
    }


    createTable(arr1) {
        let table = [];
        let length = arr1.length;

        if (length === 0) {
            table.push(<div>пока ничего нет</div>)
        } else {
            for (let i = 0; i < length; i++) {
                table.push(
                    <img className="minphoto" src=
                        {
                            arr1[i].photo
                        }/>
                )
            }
        }
        return table
    }


    render() {
        return (
            <div id="user">

                <div id="pic">
                    <img id="ico" src={this.state.arr1.profileImageUrl}/>
                    <p>{this.state.arr1.name}</p>
                    <p>ваша оценочка {this.state.score}</p>
                </div>

                <button onClick={this.home}
                        style={{width: '40px', height: '34px', background: 'white', border: '1px solid black'}}>
                    <img src={home} width='13' height='13'/></button>

                <div id="buttons">
                    <div id="l">
                        <button onClick={this.logout} style={{
                            width: '140px',
                            height: '36px',
                            background: 'black',
                            border: '1px solid white',
                            color: 'white'
                        }}>Logout
                        </button>
                    </div>

                    <div id="p" style={{background: 'black'}}>
                        <button onClick={this.showMenu} style={{
                            height: '34px', width: '45px',
                            border: 'black'
                        }}>
                            <img id="settingsButton" src={but} width='13' height='11'/></button>
                    </div>

                </div>
                <PostSend/>

                <div className="setBut">

                    {
                        this.state.showMenu
                            ? (
                                <div
                                    className="menu"
                                    ref={(element) => {
                                        this.dropdownMenu = element;
                                    }}
                                >
                                    <Set/>
                                    <ImageUpload/>

                                </div>
                            )
                            : (
                                <div className="void">
                                </div>
                            )
                    }
                </div>


                <GalleryStudioHome nick={this.state.nick}/>
                <br/>
                <FollowersStudio/>


                <div className="systemInfo">
                    <p>контакты системы:
                        moviesMT11@gmail.com</p>
                </div>

            </div>
        );

    }
}


export default (UsStudio);
