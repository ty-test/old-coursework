import React, {Component} from 'react';
import axios from "axios";
import Select from 'react-select';
import "../componentCSS/post.css"

export default class PostSend extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showResults: false,
            file: '',
            imgUrl: '',
            body: '',
            newTags: '',
            tags: [],
            selected: []

        };
        this.handleChange = this.handleChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
        this.testSession = this.testSession.bind(this);
        this.testSession();
    }


    testSession() {

        axios.get('http://localhost:8080/tags', {withCredentials: true})
            .then(res => {
                if (res.status !== 401) {
                    this.setState({tags: res.data});
                    console.log(this.state.genres);
                    return true;
                }
            }).catch(err => {
            return false;
        });
    }

    showLogin = () => {
        this.setState({showResults: true});
    };

    hideLogin = () => {
        this.setState({showResults: false, egg: false});
    };

    handleChange(e) {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault();

        let params = new URLSearchParams();
        params.append('body', this.state.body);
        params.append('img', this.state.imgUrl);
        params.append('tags', JSON.stringify(this.state.selected));
        params.append('newTags', this.state.newTags);
        axios.post('http://localhost:8080/newPost', params, {withCredentials: true}).then(
            response => {
                if (response.status === 200) {
                    console.log("worked");
                    this.setState({showResults: false});
                    // window.location.reload(true);
                }
            }
        ).catch(err => {
            console.log(err);
            return false;
        });

    }

    handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imgUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }


    render() {

        const logChange = (val) => {
            this.state.selected = [];
            this.state.selected = (typeof val, val);
        };

        const selectX = this.state.tags.map(g => ({
            value: g.id,
            label: g.tagName

        }));
        console.log(selectX);
        return (

            <div id="post">

                <button  id="postButt" onClick={this.showLogin}
                        style={{
                            width: '174px',
                            height: '25px',
                            color: 'white',
                            background: 'black',
                            border: 'none'
                        }}>Новый пост
                </button>

                {this.state.showResults ?
                    <div id="formPost" >

                        <form id="f"
                              onSubmit={this.handleSubmit}>

                            <div>
                                <input type="text" name="newTags" value={this.state.newTags}
                                       onChange={this.handleChange} placeholder="your tag by #"/>
                            </div>

                            <div>
                                <input type="text" name="body" value={this.state.body} onChange={this.handleChange}
                                       required placeholder="text"/></div>

                            <input className="fileInput"
                                   type="file"
                                   onChange={(e) => this.handleImageChange(e)}
                            />

                            <div id="selectPost">
                                <Select
                                    isMulti
                                    name="colors"
                                    options={selectX}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    placeholder="select tags"
                                    onChange={logChange}
                                    styles={{
                                        option: (base) => ({
                                            ...base,
                                            border: `none`,
                                            height: '100%',
                                            color: 'black',
                                        })
                                    }}
                                />
                            </div>
                            <button id="shit"
                                    type="submit"
                                    onClick={(e) => this.handleSubmit(e)}
                                   >
                                Добавить
                            </button>

                            <button type="button" onClick={this.hideLogin}
                                    className="cancelbtn"
                                    >Cancel
                            </button>
                        </form>
                    </div> : null}

            </div>
        );
    }
}