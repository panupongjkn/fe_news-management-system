import React from 'react'
import Layout from '../Components/Layout'
import { Input } from 'antd';
import styled from 'styled-components';
import axios from 'axios';
import {Redirect} from 'react-router-dom'


const ButtonCreateTargetGroup = styled.div`
    background-color: #050042;
    border: none;
    border-radius: 10px;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    width: 77px;
    margin-top: 10px;
`

class CreateTargetGroupPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                system: "",
                systemid: 0,
                pageType: "targetgroup",
                page: "createtargetgroup",
            },
            targetgroupName: "",
            redirect: false
        }
    }
    async componentWillMount() {
        const { system, systemid } = this.props.match.params
        console.log(system)
        await this.setState(prevState => ({
            data: {
                ...prevState.data,
                system: system,
                systemid: systemid,
            }
        }))
    }

    SetTargetGroup = (e) => {
        this.setState({
            targetgroupName: e.target.value
        })
    }
    AddTargetGroup = () => {
        const { systemid } = this.props.match.params
        let data = new FormData()
        data.append("systemid", systemid)
        data.append("targetgroupname", this.state.targetgroupName)
        axios.post(`${process.env.REACT_APP_BE_PATH}/targetgroup/create`, data, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("JWT")
            }
        }).then(res => {
             this.setState({
                 redirect: true
             })
        })
    }

    render() {
        if(this.state.redirect) {
            return <Redirect push to= {`/${this.state.data.system}/${this.state.data.systemid}/targetgroup/alltargetgroup`}/>
        }
        return (
            <Layout {...this.props} data={this.state.data}>
                <div className="container pt-4">
                    <h1>Create target group</h1>
                    <Input onChange={this.SetTargetGroup} value={this.state.targetgroupName} placeholder="Group name" />
                    <ButtonCreateTargetGroup onClick={this.AddTargetGroup} type="button">Create</ButtonCreateTargetGroup>
                </div>

            </Layout>
        )
    }
}

export default CreateTargetGroupPage