import React from 'react';
import axios from "axios";
import '../componentCSS/subscribe.css'


export default class FollowersAnalyst extends React.Component {
    constructor(props) {
        super(props);
        this.state =
            {
                nick: window.sessionStorage.getItem('nick'),
                showMenu: false,
                followers: []
            }

        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.subscribe = this.subscribe.bind(this);
        this.subscribe();
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

    subscribe() {
        let params = new URLSearchParams();
        params.append('nick', this.state.nick);
        axios.post('http://localhost:8080/analystFollowers',
            params, {withCredentials: true}).then(res => {
            if (res.status === 200) {
                this.setState({followers: res.data});
                console.log("vooooot");
                return true;
            }
            else return false;
        }).catch()
    }

    createTable(arr) {
        let table = [];
        let length = arr.length;

        if (length === 0) {
            table.push(<div>пока ничего нет</div>)
        }else {

            for (let i = 0; i < length; i++) {
                table.push(<tr>

                    <td><img className="Sub" src=
                        {
                            arr[i].profileImageUrl
                        } width='70' height='70'/>
                    </td>

                    <td>{arr[i].name}</td>
                </tr>)
            }
        }
        return table
    }


    render() {
        return (<div>

                <a onClick={this.showMenu}> ваши подписчики </a>
                {
                    this.state.showMenu && this.state.are !== null && this.state.followers !== undefined
                        ? (
                            <div
                                className="subSheet"
                                ref={(element) => {
                                    this.dropdownMenu = element;
                                }}>

                                <tbody>
                                {this.createTable(this.state.followers)}
                                </tbody>

                            </div>
                        )
                        : (
                            <div>

                            </div>
                        )
                }


            </div>
        );
    }
}
