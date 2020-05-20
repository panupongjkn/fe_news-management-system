import React from 'react'
import axios from 'axios'
import withAuth from "../HOC/withAuth"
import { Redirect, Link } from 'react-router-dom'
import { Input } from 'antd'

import CreateLineOA from '../Components/CreateSystemPage/CreateLineOA'
class CreateSystemPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            system: {
                systemname: "",
                lineOA: [
                    {
                        lineoaname: "",
                        channelid: "",
                        channeltoken: "",
                    }
                ],
                checkLineOA: false,
            },
            redirect: false,
        }
    }
    onChangeName = (e) => {
        let stateName = e.target.name
        let value = e.target.value
        this.setState(prevState => ({
            system: {
                ...prevState.system,
                [stateName]: value,
            }
        }))
    }
    onChangeLineOA = (e, key) => {
        let name = e.target.name
        let value = e.target.value
        let alllineoa = this.state.system.lineOA
        let lineoa = alllineoa[key]
        lineoa = {
            ...lineoa,
            [name]: value
        }
        alllineoa[key] = lineoa
        this.setState(prevState => ({
            system: {
                ...prevState.system,
                lineOA: alllineoa
            }
        }))
    }
    onCreateSystem = (event) => {
        event.preventDefault();
        this.props.onLoading(true)
        let lineoa = []
        if(this.state.system.checkLineOA){
            lineoa = this.state.system.lineOA
        }
        let data = {
            systemname: this.state.system.systemname,
            lineOA: lineoa
        }
        axios.post(`${process.env.REACT_APP_BE_PATH}/system/create`, data, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("JWT")
            }
        }).then(res => {
            this.props.onLoading(false)
            this.setState({ redirect: true })
        })
    }
    onCheckLineOA = () => {
        this.setState(prevState => ({
            system: {
                ...prevState.system,
                checkLineOA: !this.state.system.checkLineOA
            }
        }))
    }
    render() {
        if (this.state.redirect) {
            return <Redirect push to="/allsystem" />
        }
        return (
            <div className="container  pt-3">
                <div className="col-8 mx-auto">
                    <h3>Create System</h3>
                    <form onSubmit={this.onCreateSystem}>
                        <Input
                            required
                            name="systemname"
                            value={this.state.system.systemname}
                            placeholder="System Name"
                            onChange={this.onChangeName} type="text" />
                        <CreateLineOA system={this.state.system} onChangeLineOA={this.onChangeLineOA} onCheckLineOA={this.onCheckLineOA} className="pt-3" />
                        <div className="d-flex justify-content-between mt-5">
                            <Link to={`/systems`} ><button type="button " className="btn btn-danger">Back</button></Link>
                            <button className="btn btn-success" type="submit">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default withAuth(CreateSystemPage)