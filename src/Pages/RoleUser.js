import React from 'react'
import Layout from '../Components/Layout'
import withAuth from '../HOC/withAuth'
import axios from 'axios'
import styled from 'styled-components'
import {Input} from 'antd'

const Box = styled.div`
    height: 145px;
    border: 1px solid #A6A6A6;
    border-radius: 10px;
    cursor: pointer;
    text-align: center;
    padding-top: 60px;
`
const BoxAddNewsType = styled.div`
    height: 145px;
    border: 1px solid #A6A6A6;
    border-radius: 10px;
    cursor: pointer;
    text-align: center;
`
const ButtonAddNewsType = styled.div`
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
class RoleUserPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                system: "",
                systemid:"",
                page: "role"
            },
            RoleUser: "",
            role: []
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
        console.log(this.state)
        this.GetRoleUser()
    }
    GetRoleUser = () => {
        axios.get(`${process.env.REACT_APP_BE_PATH}/role/all?systemid=${this.state.data.systemid}&systemname=${this.state.data.system}`, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("JWT")
            }
        }).then(res => {
            console.log(res.data)
            this.setState({ role: res.data })
        })
    }
    SetRoleUSer = (e) => {
        this.setState({
            RoleUser: e.target.value
        })
    }
    AddRoleUser = () => {
        let data = new FormData()
        data.append("systemid", this.state.data.systemid)
        data.append("rolename", this.state.RoleUser)
        axios.post(`${process.env.REACT_APP_BE_PATH}/role/create`, data, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("JWT")
            }
        }).then(res => {
            this.GetRoleUser()
            this.setState({ NewsType: "" })
        })
    }
    render() {
        return (
            <Layout {...this.props} data={this.state.data}>
                <div className="container pt-4">
                    <h3>Create role user</h3>
                    <div className="col-12">
                        <div className="row">
                            <div className="col-3 p-2">
                                <BoxAddNewsType className="shadow-sm pt-3 px-3">
                                    <p>Add role user</p>
                                    <Input onChange={(e) => this.SetRoleUSer(e)} value={this.state.RoleUser} placeholder="Enter type name" /><br />
                                    <ButtonAddNewsType onClick={this.AddRoleUser} type="button">Add</ButtonAddNewsType>
                                </BoxAddNewsType>
                            </div>
                            {this.state.role.map((role, key) => {
                                return (
                                    <div key={key} className="col-3 p-2">
                                        <Box className="shadow-sm">
                                            {role.RoleName}
                                        </Box>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default withAuth(RoleUserPage)