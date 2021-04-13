import React, {Component} from 'react';
import axios from "axios";
import "../componentCSS/image.css"


export default class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showResults: false,
            file: '',
            imgUrl: ''
        };
    }

    showLogin = () => {
        this.setState({showResults: true});
    };

    hideLogin = () => {
        this.setState({showResults: false, egg: false});
    };

    _handleSubmit(e) {
        e.preventDefault();

        let params = new URLSearchParams();
        params.append('imgUrl', this.state.imgUrl);
        axios.post('http://localhost:8080/userImgLoad', params,{withCredentials:true}).then(
            response => {
                if (response.status === 200) {
                    console.log("worked");
                    this.setState({showResults: false});
                    window.location.reload(true);
                }
            }
        ).catch(err => {
            return false;
        });
    }

    _handleImageChange(e) {
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
        return (
            <div>
                <button onClick={this.showLogin} className="ordinary"
                        style={{
                            width: '140px',
                            height: '25px',
                            color: 'white',
                            background: 'black'
                        }}>Фото
                </button>

                {this.state.showResults ?
                    <div className="previewComponent">
                        <form name="imgForm" onSubmit={(e) => this._handleSubmit(e)}>
                            <input className="fileInput"
                                   type="file"
                                   onChange={(e) => this._handleImageChange(e)}
                            />
                            <button className="submitButton"
                                    type="submit"
                                    onClick={(e) => this._handleSubmit(e)}>Upload Image
                            </button>

                            <button type="button" onClick={this.hideLogin}
                                    className="cancelbtn">Cancel
                            </button>
                        </form>
                    </div> : null}
            </div>
        )
    }
}

