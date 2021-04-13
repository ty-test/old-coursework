import React, {Component} from 'react';
import axios from "axios";

import but from "../../components/pictures/settings.PNG"
import home from "../../components/pictures/Home.png"
import "../../components/componentCSS/user.css"

import Set from "../../components/parts/settings";
import ImageUpload from "../../components/parts/image"
import Subscribe from '../../components/parts/subscribe'
import Gallery from "../../components/parts/galery";
import Followers from "../../components/parts/followers";
import Reviews from "../../components/parts/reviews";
import FollowersAnalyst from "../../components/parts/followersAnalyst";


export default class UsAnalyst extends React.Component {
    constructor(props) {
        super(props);

        this.state =
            {
                nick: window.sessionStorage.getItem('nick'),
                showR: false,
                showMenu: false,
                arr: [],
                arr1: [],
                followers: [],
                posts: [],
                score: ''
            };

        this.testSession = this.testSession.bind(this);
        this.testSession();

        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);

        this.logout = this.logout.bind(this);
        this.home = this.home.bind(this);


    }
    home(){
        window.location = '/analyst';
        // this.props.history.push('/analyst');
    }

    testSession() {

        axios.get('http://localhost:8080/get', {withCredentials: true})
            .then(res => {
                if (res.status !== 401) {
                    this.setState({arr1: res.data});
                    console.log("картинка" + this.state.arr1);
                }
                else return false;
            }).catch(err => {
            console.log('ошибка в вас');
        });

        let params = new URLSearchParams();
        params.append('nick', this.state.nick);

        axios.post('http://localhost:8080/analystFollowers',
            params, {withCredentials: true}).then(res => {
            if (res.status === 200) {
                this.setState({followers: res.data});
                this.setState({showR: true});
                console.log("followers gone");
                return true;
            }
            else return false;
        }).catch();

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


    }

    logout() {
        axios.post('http://localhost:8080/logout', {});
        //this.props.history.push();
        window.location.href = '/';
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


    createFoll(arr1) {
        let showingTooltip;

        document.onmouseover = function (e) {
            var target = e.target;

            var tooltip = target.getAttribute('data-tooltip');
            if (!tooltip) return;

            var tooltipElem = document.createElement('div');
            tooltipElem.className = 'tooltip';
            tooltipElem.innerHTML = tooltip;
            document.body.appendChild(tooltipElem);

            var coords = target.getBoundingClientRect();

            var left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
            if (left < 0) left = 0; // не вылезать за левую границу окна

            var top = coords.top - tooltipElem.offsetHeight - 5;
            if (top < 0) { // не вылезать за верхнюю границу окна
                top = coords.top + target.offsetHeight + 5;
            }

            tooltipElem.style.left = left + 'px';
            tooltipElem.style.top = top + 'px';

            showingTooltip = tooltipElem;
        };

        document.onmouseout = function (e) {

            if (showingTooltip) {
                document.body.removeChild(showingTooltip);
                showingTooltip = null;
            }

        };
        let table = []
        let length = arr1.length;
        let c = 6;
        if (length === 0) {
            table.push(<div>пока ничго нет</div>)
        } else { if (length < c) {c = length;}

            for (let i = 0; i < c; i++) {
                table.push(
                    <img className="miniSub" src=
                        {
                            arr1[i].profileImageUrl
                        } width='50' height='50' data-tooltip={arr1[i].name}/>)
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
                            height: '34px',
                            background: 'black',
                            border: 'none',
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
                    </div></div>
                <div id="setBut">

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

                {/*<Reviews/>*/}

                <FollowersAnalyst/>

                <div id="foll">


                    {
                        (this.state.showR && this.state.followers !== null && this.state.followers !== undefined) ?
                            <div>
                                {this.createFoll(this.state.followers)}
                            </div> :
                            <div> Здесь будут ваши подписчики </div>
                    }
                </div>


                <div className="systemInfo">
                    <p>контакты системы:
                        moviesMT11@gmail.com</p>
                </div>
            </div>
        );

    }
}


