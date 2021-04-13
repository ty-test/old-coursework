import React from 'react';
import './FilmAdd.css'
import axios from "axios";
import {Link} from "react-router-dom";

class FilmAdd extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            name: "",
            create_date: "",
            body: "",
            photo: "",
            cashbox: "",
            buttonNamefile: "Добавьте глвную фотографию",
            buttonNamemyFile: "Добавьте дополнительную фотографию №1",
            buttonNamefile2: "Добавьте дополнительную фотографию №2",
            buttonNamefile3: "Добавьте дополнительную фотографию №3",
            buttonNamefile4: "Добавьте дополнительную фотографию №4",
            buttonNamefile5: "Добавьте дополнительную фотографию №5",
            fileUrl: "",
            myFileUrl: "",
            file2Url: "",
            file3Url: "",
            file4Url: "",
            file5Url: ""
        };
        this.creteFilm = this.creteFilm.bind(this);
        this.onChange = this.onChange.bind(this);
        // this.savePhoto = this.savePhoto.bind(this);
    }

    onChange(e) {
        e.preventDefault();
        console.log(e.target.name + ": " + e.target.value);
        this.setState({[e.target.name]: e.target.value})
    }

    handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        let name = e.target.name;

        reader.onloadend = () => {
            this.setState({
                [name + "Url"]: reader.result,
                ["buttonName" + name]: file.name
            });
        };
        reader.readAsDataURL(file)
    }

    exit() {
        axios.get('http://localhost:8080/logout', {
            withCredentials: true
        });
    }

    //
    // savePhoto(){
    //     let params = new URLSearchParams();
    //     params.append("photoFirst", this.state.myFileUrl);
    //     fetch('http://localhost:8080/createNewFilm', {
    //         method: 'POST',
    //         credentials: 'include',
    //         body: params
    //     })
    // }

    creteFilm(e) {
        e.preventDefault();
        let params = new URLSearchParams();

        alert(this.state.studio);

        params.append("name", this.state.content);
        params.append("create_date", this.state.create_date);
        params.append("body", this.state.message);
        params.append("photo", this.state.fileUrl);
        params.append("cashbox", this.state.cashbox);
        params.append("photo1", this.state.myFileUrl);
        params.append("photo2", this.state.file2Url);
        params.append("photo3", this.state.file3Url);
        params.append("photo4", this.state.file4Url);
        params.append("photo5", this.state.file5Url);
        params.append("studio", this.state.studio);


        fetch('http://localhost:8080/createNewFilm', {
            method: 'POST',
            credentials: 'include',
            body: params
        }).then(res => {
            if (res.status !== 401) {
                this.setState({
                    content: "",
                    create_date: "",
                    message: "",
                    photo: "",
                    cashbox: "",
                    fileUrl: "",
                    myFileUrl: "",
                    file2Url: "",
                    file3Url: "",
                    file4Url: "",
                    file5Url: "",
                    buttonNamefile: "Добавьте глвную фотографию",
                    buttonNamemyFile: "Добавьте дополнительную фотографию №1",
                    buttonNamefile2: "Добавьте дополнительную фотографию №2",
                    buttonNamefile3: "Добавьте дополнительную фотографию №3",
                    buttonNamefile4: "Добавьте дополнительную фотографию №4",
                    buttonNamefile5: "Добавьте дополнительную фотографию №5"
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div>
                <div id="name_art">Добавить новый фильм</div>
                <form id="createNewFilm" onSubmit={this.creteFilm}>
                    <div id="table_files_for_add_film">
                        <input type="file" onChange={(e) => this.handleImageChange(e)} name="file" id="file"
                               className="inputfile"/>
                        <label htmlFor="file">{this.state.buttonNamefile}</label>

                        <input type="file" onChange={(e) => this.handleImageChange(e)} name="myFile" id="myFile"
                               className="inputfile"/>
                        <label htmlFor="myFile">{this.state.buttonNamemyFile}</label>

                        <input type="file" onChange={(e) => this.handleImageChange(e)} name="file2" id="file2"
                               className="inputfile"/>
                        <label htmlFor="file2">{this.state.buttonNamefile2}</label>

                        <input type="file" onChange={(e) => this.handleImageChange(e)} name="file3" id="file3"
                               className="inputfile"/>
                        <label htmlFor="file3">{this.state.buttonNamefile3}</label>

                        <input type="file" onChange={(e) => this.handleImageChange(e)} name="file4" id="file4"
                               className="inputfile"/>
                        <label htmlFor="file4">{this.state.buttonNamefile4}</label>

                        <input type="file" onChange={(e) => this.handleImageChange(e)} name="file5" id="file5"
                               className="inputfile"/>
                        <label htmlFor="file5">{this.state.buttonNamefile5}</label>
                    </div>

                    <textarea value={this.state.message} onChange={this.onChange.bind(this)}
                              placeholder="введите описание фильма" name="message"
                              id="description" required/>
                    <div id="dateCreation_film_add">
                        <label htmlFor="date">Укажите дату создания</label>
                        <input type="date" onChange={this.onChange} name="create_date" id="create_date"/>
                    </div>

                    <input type="text" id="nameAddFilm" value={this.state.content} onChange={this.onChange.bind(this)}
                           placeholder="введите название" name="content" required/>

                    <label id="studio_name_label">Укажите студию</label>
                    <input type="text" id="nameStudioAddFilm" value={this.state.studio}
                           onChange={this.onChange.bind(this)}
                           placeholder="введите студию" name="studio" required/>

                    <label id="cahbox_label">Укажите студию</label>
                    <input type="number" id="cashbox" name="cashbox" onChange={this.onChange.bind(this)}
                           placeholder="введите кассу"/>

                    <button id="submit-film" className="buttons" type="submit">отправить</button>

                </form>
                <div id="mainMenuForAddNewFilm">
                    <div className="category-wrap">
                        <h3>Основное меню</h3>
                        <ul>
                            <li>
                                <div name="a"><Link to="/changeLevel">Блокировка пользователя</Link></div>
                            </li>
                            <li>
                                <div name="a"><Link to="/bank">Банковская система</Link></div>
                            </li>
                            <li>
                                <div name="a"><Link to="/complaintSupport">Ответить на жалобы</Link></div>
                            </li>
                            <li>
                                <div name="a"><Link to="/" onClick={this.exit}>Выход</Link></div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }


}

export default (FilmAdd);