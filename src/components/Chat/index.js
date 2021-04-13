import React from "react";
import chat from "./img/chat.png";
import "./Chat.css"
import axios from "axios";
import debate from "../MiniFilm/img/debate.png";

class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: window.sessionStorage.getItem('nick'),
            showResults: false,
            message: '',
            err: false,
            egg: false,
            filmName: "",
            photo: [],
            messageFromServer: [],
            chatUser: "",
            msg: false
        };
        this.filmInformation = this.filmInformation.bind(this);
        this.filmInformation();

        this.getMessagesFromServer = this.getMessagesFromServer.bind(this);
        this.getMessagesFromServer();

        this.sendMessage = this.sendMessage.bind(this);

        // alert(this.state.userName);
    }

    showLogin = () => {
        this.setState({showResults: true});
    };

    hideLogin = () => {
        this.setState({showResults: false, egg: false});
    };

    onChange(e) {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value})
    }

    getMessagesFromServer() {
        let params = new URLSearchParams();
        params.append('id_film', this.props.idFilm);
        axios.get('http://localhost:8080/getMes', {
            withCredentials: true,
            params
        })
            .then(res => {
                if (res.status !== 401) {
                    this.setState({messageFromServer: res.data});
                    if (res.data!=null) this.setState({mag: true})
                }
            }).catch(err => {
                this.setState({err: true});
            console.log(err);
        });
    }

    filmInformation() {
        let params = new URLSearchParams();
        params.append('film_id', this.props.idFilm);
        axios.get('http://localhost:8080/getMainInfoOfTehFilm', {
            withCredentials: true,
            params
        })
            .then(res => {
                if (res.status !== 401) {
                    this.setState({filmName: res.data.name});
                    this.arrayOfPhoto();
                }
            }).catch(err => {
            console.log(err);
        });
    }

    arrayOfPhoto() {
        let params = new URLSearchParams();
        params.append('film_id', this.props.idFilm);//this.props.info
        axios.get('http://localhost:8080/getPhotosAsString', {
            withCredentials: true,
            params
        })
            .then(res => {
                if (res.status !== 401) {
                    this.setState({photo: res.data});
                }
            }).catch(err => {
            console.log(err);
        });
    }

    sendMessage(e) {
        e.preventDefault();
        let params = new URLSearchParams();
        params.append('film_id', this.props.idFilm);
        params.append('message', this.state.message);
        fetch('http://localhost:8080/setMes', {
            method: 'POST',
            credentials: 'include',
            body: params
        }).then(res => {
            if (res.status !== 401) {
                this.getMessagesFromServer();
                this.setState({message: ""});
            }
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.showLogin} id="chatButton" className="ordinary">
                    {this.props.locate === "1" ?
                        <img className="imgDes" src={chat} alt="иллюстрация"/>
                        :
                        <img className="imgMini" id="discussion" src={debate} alt="иллюстрация"/>
                    }
                </button>

                {this.state.showResults ?
                    <div>
                        <div className="chat_modal">
                            <form className="chat_modal-content chat_animate" onSubmit={this.sendMessage}>
                                <span className="close" onClick={this.hideLogin}/>
                                <img id="chatPic" src={this.state.photo[0]} alt="иллюстрация"/>
                                <div id="nameOfTheFilm">{this.state.filmName}</div>

                                {(typeof this.state.messageFromServer.map != "undefined")?
                                <div id="messageBox">
                                    {this.state.messageFromServer.map(
                                        message => {
                                            this.state.chatUser = message.user;
                                            return (
                                                <div>
                                                    {this.state.userName === message.login ?
                                                        <div>
                                                            <div className="text_chat2 goo2">
                                                                {message.message}
                                                            </div>
                                                        </div>
                                                        :
                                                        <div>
                                                            {message.user}<br/>
                                                            <div className="text_chat goo">
                                                                {message.message}
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            )
                                        }
                                    )}
                                </div>: null}

                                <div id="send_button_and_input">
                                    <input type="text" value={this.state.message} onChange={this.onChange.bind(this)}
                                           placeholder="введите сообщение" name="message" required/>
                                    <button className="buttons" id="button_send_mes_in_chat" type="submit">отправить
                                    </button>
                                    <button type="reset" className="buttons" id="button_refresh_chat"
                                            onClick={this.getMessagesFromServer}>обновить
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    :
                    null
                }
            </div>
        )
    }
}

export default (Chat);
