import React from 'react';
import axios from "axios";
import '../componentCSS/subscribe.css'
import {Link} from 'react-router-dom';
import User from "../user";
import UsActor from "../../Customers/actor/usActor";
import UsAnalyst from "../../Customers/analyst/usAnalyst";
import UsStudio from "../../Customers/studio/UsStudio";


export default class Subscribe extends React.Component {
    constructor(props) {
        super(props);
        this.state =
            {
                nick: '',
                showMenu: false,
                showSub: false,
                arr: []
            }

        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.subscribe = this.subscribe.bind(this);
        this.subscribe();
    }

    showMenu(event) {
        this.setState({showMenu: true})
    }

    closeMenu(event) {
        this.setState({showMenu: false});

    }

    subscribe() {
        axios.get('http://localhost:8080/subscribe', {withCredentials: true})
            .then(res => {
                if (res.status === 200) {
                    this.setState({arr: res.data});
                    this.setState({ showSub:true});

                    console.log("sub are here")
                    console.log( this.state.showSub);
                    return true;
                }
                else return false;
            }).catch()
    }

    createTable(arr1) {
        let table = []
        let length = arr1.length;
        console.log("length "+length);

        for (let i = 0; i < length; i++) {


            this.state.nick = arr1[i].login;

            console.log(this.state.nick);

            switch (arr1[i].levelAccess) {
                case 1:
                    table.push(<tr>

                        <td><img id="Sub" src=
                            {
                                arr1[i].profileImageUrl
                            } width='70' height='70'/>
                        </td>

                        <td>
                            <Link to={{pathname: '/actorPage', state: {nick: this.state.nick}}}> {arr1[i].name} </Link>
                        </td>

                    </tr>);

                    break;

                case 2:
                    table.push(<tr>

                        <td><img id="Sub" src=
                            {
                                arr1[i].profileImageUrl
                            } width='70' height='70'/>
                        </td>

                        <td>
                            <Link to={{pathname: '/analystPage', state: {nick: this.state.nick}}}> {arr1[i].name}</Link>
                        </td>

                    </tr>);
                    break;
                case 3:
                    table.push(<tr>

                        <td><img id="Sub" src=
                            {
                                arr1[i].profileImageUrl
                            } width='70' height='70'/>
                        </td>

                        <td>
                            <Link to={{pathname: '/StudioPage', state: {nick: this.state.nick}}}> {arr1[i].name}</Link>
                        </td>

                    </tr>);
                    break;

                default:
                    // this.props.history.push('/');
                    break;
            }
//

        }
        return table
    }

    createLilTable(arr1) {
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
        console.log(length);

        if (length === 0) { table.push(<div>пока ничего нет </div>)
            return table }
        let c = 6;
        if (length < c) {
            c = length;
        }
        for (let i = 0; i < c; i++) {
            table.push(
                <img className="miniSub" src=
                    {
                        arr1[i].profileImageUrl
                    } width='50' height='50' data-tooltip={arr1[i].name}/>)
        }

        return table
    }

    render() {
        return (<div>
                <a onClick={this.showMenu}> ваши подписки </a>
                {
                    this.state.showMenu && this.state.arr !== null && this.state.arr !== undefined
                        ? (
                            <div id="subSheet">


                                <a  onClick={this.closeMenu}>закрыть</a>

                                <tbody>
                                {this.createTable(this.state.arr)}
                                </tbody>

                            </div>
                        )
                        : (
                            <div></div>
                        )
                }

                <div className="sub">
                    {
                        (this.state.showSub && this.state.arr !== null && this.state.arr !== undefined) ?
                            (<div>
                                {this.createLilTable(this.state.arr)}
                            </div>) :
                            (<div> Здесь будут ваши подписки </div>)
                    }
                </div>

            </div>
        );
    }
}