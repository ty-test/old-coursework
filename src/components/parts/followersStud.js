import React from 'react';
import axios from "axios";
import '../componentCSS/subscribe.css'


export default class FollowersStudio extends React.Component {
    constructor(props) {
        super(props);
        this.state =
            {
                nick: window.sessionStorage.getItem('nick'),
                showMenu: false,
                arr: []
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
        axios.post('http://localhost:8080/studioFollowers',
            params, {withCredentials: true}).then(res => {
            if (res.status === 200) {
                this.setState({arr: res.data});
                return true;
            }
            else return false;
        }).catch()
    }

    createTable(arr) {
        let table = [];
        let length = Object.keys(arr).length / 9;
        console.log("followers length in big form" + length);

        if (length === 1) {
            table.push(
                <tr>
                    <td>
                        <img className="Sub" src=
                            {
                                arr.profileImageUrl
                            } width='70' height='70'/></td>

                    <td>{arr.name}</td>
                </tr>
            )
        } else {

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
        let table = [];
        let length =arr1.length;
        let c = 6;


        if (length === 0) {
            table.push(
                <div>пока ниего нет</div>
            )
        } else{
            if (length < c) { c = length;}

            for (let i = 0; i < c; i++) {
                table.push(
                    <img className="miniSub" src=
                        {
                            arr1[i].profileImageUrl
                        } width='50' height='50' data-tooltip={arr1[i].name}/>)

            }}
        return table
    }

    render() {
        return (<div>

                <a onClick={this.showMenu}> ваши подписчики </a>
                {
                    this.state.showMenu && this.state.arr !== null && this.state.arr !== undefined
                        ? (
                            <div
                                className="subSheet"
                                ref={(element) => {
                                    this.dropdownMenu = element;
                                }}>

                                <tbody>
                                {this.createTable(this.state.arr)}
                                </tbody>

                            </div>
                        )
                        : (
                            <div>

                            </div>
                        )
                }

                <div className="foll" style={{ height: '150px'}}>

                    {
                        (this.state.arr !== null && this.state.arr !== undefined) ?
                            <div>
                                {this.createFoll(this.state.arr)}
                            </div> :
                            <div> Здесь будут ваши подписчики </div>
                    }
                </div>

            </div>
        );
    }
}
