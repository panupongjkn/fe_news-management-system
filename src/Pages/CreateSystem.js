import React from 'react'
import axios from 'axios'
import withAuth from "../HOC/withAuth"
import { Redirect } from 'react-router-dom'

class CreateSystemPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            systemname: ""
        }
    }
    onChangeName = (e) => {
        let stateName = e.target.name
        let value = e.target.value
        this.setState({
            [stateName]: value,
            redirect: false,
        })
    }
    onCreateSystem = (event) => {
        let data = new FormData()
        data.append("systemname", this.state.systemname)
        axios.post('http://localhost:8080/system/create', data, {
            headers : {
                'Authorization': "Bearer "+localStorage.getItem("JWT")
            }
        }).then(res => {
            this.setState({redirect: true})
        })
        event.preventDefault();
    }
    render() {
        if (this.state.redirect) {
            return <Redirect push to="/allsystem"/>
        }
        return (
            <div>
                <form onSubmit={this.onCreateSystem}>
                    <label>System name :</label>
                    <input name="systemname" value={this.state.systemname} onChange={this.onChangeName} type="text"/>
                    <button className="btn btn-success" type="submit">Create</button>
                </form>
            </div>
        )
    }
}

export default withAuth(CreateSystemPage)