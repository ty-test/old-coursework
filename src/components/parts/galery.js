import React from 'react';
import axios from "axios";
import '../componentCSS/gallery.css'

export default class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state =
            {
                // nick: window.sessionStorage.getItem('nick'),
                nick: this.props.nick,
                showMenu: false,
                arr: [],
            }

        console.log("gsllery log" + this.props.nick)

        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.imgs = this.imgs.bind(this);
        this.imgs();
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

    imgs() {
        let params = new URLSearchParams();
        params.append('nick', this.state.nick);

        axios.post('http://localhost:8080/getActorPhotos',
            params, {withCredentials: true}).then(res => {
            if (res.status === 200) {
                this.setState({arr: res.data});
                this.setState({showG: true});
                return true;
            }
        }).catch(err => {
            console.log(err);
        });
    }

    createTable(arr1) {
        let table = [];
        let length = arr1.length;
        console.log(length);
        if (length === 0) {
            table.push(<div>пока ничего нет</div>)
        }else {
            for (let i = 0; i < length; i++) {
                table.push(
                    <div id="photoGallery">
                        <img style={{
                            borderRadius: '10px',
                            maxWidth: '350px'
                        }} src={arr1[i].photo}/>
                        <br/>
                    </div>
                )
            }
        }
        return table
    }



    render() {
        return (<div>
                <a onClick={this.showMenu}>галерея</a>
                {
                    this.state.showMenu && this.state.arr !== null && this.state.arr !== undefined
                        ? (
                            <div
                                id="galleryComponent"
                                ref={(element) => {
                                    this.dropdownMenu = element;
                                }}>
                                <p>Галерея</p>

                                {this.createTable(this.state.arr)}


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
