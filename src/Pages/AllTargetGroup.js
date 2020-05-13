import React from 'react'
import Layout from '../Components/Layout'
import styled from 'styled-components';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import axios from 'axios'


const BoxCreateTargetGroup = styled.div`
    height: 145px;
    border: 1px solid #A6A6A6;
    border-radius: 10px;
    cursor: pointer;
    text-align: center;
    padding-top: 60px;
`


class AllTargetGroupPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                system: "",
                systemid: 0,
                pageType: "targetgroup",
                page: "alltargetgroup",
            },
            targetgroups: []
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

    componentDidMount() {
        this.GetTargetGroups()
    }
    GetTargetGroups = () => {
        const { system, systemid } = this.props.match.params
        axios.get(`http://localhost:8080/targetgroup/all?systemid=${systemid}&systemname=${system}`, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("JWT")
            }
        }).then(res => {
            console.log(res.data)
            this.setState({ targetgroups: res.data })
        })
    }

    render() {
        return (
            <Layout {...this.props} data={this.state.data}>
                <div className="container pt-4">
                    <h1>All target group</h1>
                    <div className="col-12">
                        <div className="row">
                            <div className="col-3 p-2">
                                <BoxCreateTargetGroup className="shadow-sm pt-5 px-3">
                                    <Link to={`/${this.state.system}/${this.state.systemid}/targetgroup/createtargetgroup`}>
                                        <PlusOutlined />
                                    </Link>
                                    <p>Add target group</p>
                                </BoxCreateTargetGroup>
                            </div>
                            {this.state.targetgroups.map((targetgroup) => {
                                console.log(targetgroup)
                                return (
                                    <div className="col-3 p-2">
                                        <BoxCreateTargetGroup className="shadow-sm">
                                            {targetgroup.TargetGroupName}
                                        </BoxCreateTargetGroup>
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

export default AllTargetGroupPage