import React, {Component} from 'react';
import axios from "axios";
import "./analyst.css"
import Agree from "../../components/parts/agrees";


export default class AnalystHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nick: window.sessionStorage.getItem('nick'),
            showG: false,
            showM: false,
            score: '',
            posts: [],
            arr1: [],
            arr: [],
            transaction: [],
            info: ''
        };
        this.testSession = this.testSession.bind(this);
        this.testSession();

        this.showM = this.showM.bind(this);
        this.closeM = this.closeM.bind(this);

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

        axios.post('http://localhost:8080/analystInfo', params, {withCredentials: true}).then(
            res => {
                if (res.status !== 401) {
                    this.setState({info: res.data});
                    return true;
                }
            }
        ).catch(err => {
            console.log("score" + err);
            return false;
        });

        axios.post('http://localhost:8080/analystReview', params, {withCredentials: true}).then(
            res => {
                if (res.status !== 401) {
                    this.setState({posts: res.data});
                    this.setState({showG: true});
                    console.log(this.state.posts);
                    return true;
                }
            }
        ).catch(err => {
            console.log("posts" + err);
            return false;
        });

        axios.get('http://localhost:8080/getAgree', {withCredentials: true})
            .then(res => {
                if (res.status !== 401) {
                    this.setState({transaction: res.data});
                }
                else return false;
            }).catch(err => {
        });


    }

    mail(arr1) {
        let table = [];
        let length = arr1.length;
console.log("массив тут "+arr1);
        if (length === 0) {
            table.push(<div>  у вас пока нет сообщений</div>)
        }
        else {
            for (let i = 0; i < length; i++) {
                this.state.agree = arr1[i].id;
                table.push(
                    <Agree agree={this.state.agree}/>
                )
            }
        }
        return table;
    }

    createTable(arr1) {
        let table = [];
        let length = arr1.length;
        if (length === 0) {
            table.push(<div>пока ничего нет</div>)
        }else {
            for (let i = 0; i < length; i++) {
                table.push(
                    <div>

                        <div id="lilPost" style={{
                            width: '900px',
                            border: 'none',
                        }}>
                            <p>{arr1[i].body}</p>
                            _______________________________________________________________________________________________________
                        </div>
                        <br/>
                    </div>)
            }}

        return table
    }


    render() {
        return (
            <div id="analystsssssss" style={{
                width: '1000px',
                height: '100%'
            }}>

                <div id="analystPic">
                    <img id="analystLogo" src={this.state.arr1.profileImageUrl}/>
                    <p>{this.state.arr1.name}</p>
                    <p>info {this.state.info}</p>

                    <p>ваша оценочка</p>
                    <div className="circle">
                        <div className="number">
                            {this.state.score}
                        </div>
                    </div>
                </div>
                <br/>

                <div id="reviews">
                    <a onClick={this.showM}> почта</a>

                    {
                        (this.state.showM ) ?
                            <div>
                                <a onClick={this.closeM}>закрыть</a>
                                {this.mail(this.state.transaction)}
                            </div> : <p>
                            </p>
                    }

                </div>
                <div>
                    {
                        (this.state.showG && this.state.posts !== null && this.state.posts !== undefined) ?
                            <div>
                                {this.createTable(this.state.posts)}
                            </div> :
                            <div> Здесь будут ваши посты</div>
                    }
                </div>


            </div>


        );
    }
}