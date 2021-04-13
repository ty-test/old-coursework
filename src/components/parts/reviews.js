import React from 'react';
import axios from "axios";
import '../componentCSS/subscribe.css'


export default class Reviews extends React.Component {
    constructor(props) {
        super(props);
        this.state =
            {
                nick: window.sessionStorage.getItem('nick'),
                showMenu: false,
                posts: []
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

        axios.post('http://localhost:8080/analystReview', params, {withCredentials: true}).then(
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
    }

    createTable(arr1) {
        let table = [];
        let length = 1;
        console.log(length);

        if (length === 1) {
            console.log(arr1[0]);
            console.log(arr1[0].body);
            table.push(
                <tr>
                    <td>{arr1.name}
                        </td>

                    <td>{arr1[0].body}</td>
                </tr>
            )
        } else {

            for (let i = 0; i < length; i++) {
                table.push(<tr>

                    <td>{arr1[i].name}
                    </td>

                    <td>{arr1[i].body}</td>
                </tr>)
            }
        }
        return table
    }


    render() {
        return (<div>
                <a onClick={this.showMenu}> все аннотации </a>
                {
                    this.state.showMenu && this.state.posts !== null && this.state.posts !== undefined
                        ? (
                            <div
                                className="subSheet"
                                ref={(element) => {
                                    this.dropdownMenu = element;
                                }}>

                                <tbody>
                                {this.createTable(this.state.posts)}
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
