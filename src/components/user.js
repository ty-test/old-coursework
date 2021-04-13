import React from 'react';
import axios from "axios";
import chats from "./pictures/chats.PNG"
import but from "./pictures/settings.PNG"
import "./componentCSS/user.css"
import Set from './parts/settings'
import ImageUpload from './parts/image'
import Subscribe from './parts/subscribe'

class User extends React.Component {
    constructor(props) {
        super(props);

        this.state =
            {
                nick: window.sessionStorage.getItem('nick'),
                showMenu: false,
                showSub: false,
                showChat: false,
                arr: [],
                subscribe: []
            };


        this.testSession = this.testSession.bind(this);
        this.testSession();

        this.subscribe = this.subscribe.bind(this);
        this.subscribe();


        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);

        this.logout = this.logout.bind(this);


        this.showChat = this.showChat.bind(this);
        this.closeChat = this.closeChat.bind(this);

    }

    testSession() {

        axios({
            method: 'get',
            url: 'http://localhost:8080/get',
            withCredentials: true
        }).then((res) => {
                if (res.status === 200) {
                    this.setState({arr: res.data});
                    // console.log(this.state.arr.name)
                }
            }
        ).catch(function (error) {
            if (error === undefined || error.response === undefined) {

            }
        });

    };

    logout() {
        axios.post('http://localhost:8080/logout', {});
        //this.props.history.push();
        window.location.href = '/';

    }

    subscribe() {
        axios.get('http://localhost:8080/subscribe', {withCredentials: true})
            .then(res => {
                if (res.status === 200) {
                    this.setState({subscribe: res.data});
                    this.setState({showSub: true});
                    console.log("sub are here" + this.state.subscribe);
                    return true;
                } else return false;
            }).catch()
    }


    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});

    }


    showChat(event) {
        event.preventDefault();
        this.setState({showChat: true}, () => {
            document.addEventListener('click', this.closeChat);
        });
    }

    closeChat(event) {
        if (!this.dropdownMenu.contains(event.target)) {
            this.setState({showChat: false}, () => {
                document.removeEventListener('click', this.closeChat);
            });
        }
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


    createTable(arr1) {
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
        let table = [];
        let length = Object.keys(arr1).length / 9;
        console.log(length);

        let c = 6;
        if (length === 1) {
            console.log(arr1.profileImageUrl);
            table.push(
                <img className="miniSub" src=
                    {
                        arr1.profileImageUrl
                    } width='50' height='50' data-tooltip={arr1.name}/>
            )
        } else if (length < c) {
            c = length;

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
                    <img id="ico" src={this.state.arr.profileImageUrl}/>
                    <p>{this.state.arr.name}</p>
                </div>

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
                    </div>

                </div>

                <div id="setBut">

                    {
                        this.state.showMenu
                            ? (
                                <div
                                    id="menu"
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

                <Subscribe arr={this.state.subscribe}/>


                <div className="systemInfo">
                    <p>контакты системы:
                        moviesMT11@gmail.com</p>
                </div>
            </div>
        );

    }
}


export default (User);