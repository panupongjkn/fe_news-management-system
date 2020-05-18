import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class RegesterPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userid: '',
            email: "",
            fname: "",
            lname: "",
            redirect: false,
        }
    }
    componentDidMount() {
        if (this.props.location.state) {
            this.setState({
                userid: this.props.location.state.userid
            })
        } else {
            this.setState({
                redirect: true
            })
        }
    }
    onChangeForm = (e) => {
        let nameState = e.target.name
        let value = e.target.value
        this.setState({
            [nameState]: value
        })
    }
    onRegister = async (event) => {
        event.preventDefault();
        let data = new FormData()
        data.append("email", this.state.email)
        data.append("fname", this.state.fname)
        data.append("lname", this.state.lname)
        data.append("line", this.state.userid)
        data.append("facebook", "")
        data.append("google", "")
        await axios.post(`${process.env.REACT_APP_BE_PATH}/register`, data).then(res => {
            localStorage.setItem('JWT', res.data)
            this.setState({redirect: true})
        })
    }
    render() {
        if (this.state.redirect) {
            return <Redirect push to="/login" />
        }
        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={this.onRegister}>
                    <input name="email" required value={this.state.email} onChange={(e) => this.onChangeForm(e)} type="email" />
                    <input name="fname" required value={this.state.fname} onChange={(e) => this.onChangeForm(e)} type="text" />
                    <input name="lname" required value={this.state.lanme} onChange={(e) => this.onChangeForm(e)} type="text" />
                    <button type="submit" className='btn btn-success'>Register</button>
                </form>
            </div>
        )
    }
}

export default RegesterPage