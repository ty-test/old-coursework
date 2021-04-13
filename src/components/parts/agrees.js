import React from "react";
import axios from "axios";
import Select from 'react-select';
import "../componentCSS/agree.css"

const select = [
    {value: true, label: 'Согласен'},
    {value: false, label: 'Не согласен'}
];
export default class Agree extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            arr: [],
            answer: '',
            flag: false
        };

        this.testSession = this.testSession.bind(this);
        this.testSession();

        this.send = this.send.bind(this);


    }

    testSession() {
        let params = new URLSearchParams();
        params.append('id', this.props.agree);

        axios.post('http://localhost:8080/getTransaction', params, {withCredentials: true}).then(
            res => {
                if (res.status !== 401) {
                    this.setState({arr: res.data});
                    return true;
                }
            }
        ).catch(err => {
            console.log("arr" + err);
            return false;
        });
    }

    handleChangeX = (e) => {
        this.state.answer = e.value;
        console.log(this.state.answer)
    }

    send(e) {
        e.preventDefault();
        let params = new URLSearchParams();
        params.append('id', this.props.agree);
        params.append('answer', this.state.answer);


        axios.post('http://localhost:8080/answer', params, {withCredentials: true}).then(
            response => {
                if (response.status === 200) {

                    this.setState({flag: true});
                    console.log(this.state.flag)
                }
            }
        ).catch(err => {
            console.log(err);
            this.setState({err: true});
            return false;
        })

    }

    render() {
        return (
            <div>
                {(this.state.flag === false) ?
                    <div id="agree" style={{
                        width: '600px',
                        height:'300px',
                        color: 'white',
                        background: 'black',
                        border: 'none',
                    }}>
                        <p>Фильм: {this.state.arr.filmName}</p>
                        <p>Сумма: {this.state.arr.sum}</p>
                        <p>{this.state.arr.mail}</p>

                        <form id="sumForm" onSubmit={this.send}>

                            <Select
                                name="colors"
                                options={select}
                                placeholder="Ответ"
                                onChange={this.handleChangeX}
                                styles={{
                                    option: (base) => ({
                                        ...base,
                                        border: `none`,
                                        height: '100%',
                                        color: 'black'
                                    })
                                }}
                            />

                            <button style={{
                                color: 'white',
                                background: 'black',
                                border: 'none',
                            }}>
                                отправить
                            </button>
                        </form>
                    </div> : <div></div>}
            </div>
        )
    }

}