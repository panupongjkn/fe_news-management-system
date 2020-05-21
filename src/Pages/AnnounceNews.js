import React from 'react'
import { Radio, Select, Checkbox } from 'antd'
import Layout from '../Components/Layout'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'

const { Option } = Select
class AnnouceNewsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            type: "",
            targetgroups: [],
            data: {
                system: "",
                systemid: 0,
                pageType: "news",
                page: "",
            },
            targetgroup: "",
            redirect: false,
        };
    }
    componentWillMount() {
        this.props.onLoading(true)
        const { system, systemid } = this.props.match.params
        this.setState(prevState => ({
            data: {
                ...prevState.data,
                system: system,
                systemid: systemid
            }
        }))
        axios.get(`${process.env.REACT_APP_BE_PATH}/targetgroup/all?systemid=${systemid}&systemname=${system}`, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("JWT")
            }
        }).then((res) => {
            this.setState({
                targetgroups: res.data
            })
            this.props.onLoading(false)
        })
    }
    onChangeType = e => {
        let name = e.target.name
        console.log('radio checked', e.target.value);
        this.setState({
            [name]: e.target.value,
        });
    };
    handleChange = (value) => {
        this.setState({ targetgroup: value })
    }
    onAnnounce = () => {
        this.props.onLoading(true)
        const { systemid, newsid } = this.props.match.params
        let data = new FormData()
        data.append("newsid", newsid)
        data.append("systemid", systemid)
        axios.post(`${process.env.REACT_APP_BE_PATH}/announcenews`, data, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("JWT")
            }
        }).then(res => {
            this.props.onLoading(false)
            this.setState({ redirect: true })
        })
    }
    render() {
        if (this.state.redirect) {
            return <Redirect push to={`/${this.state.data.system}/${this.state.data.systemid}/news/allnews`} />
        }
        return (
            <Layout {...this.props} data={this.state.data}>
                <div className="col-8 mx-auto shadow-sm p-5 rouded mt-5">
                    <h5>Select target group to announce</h5>
                    <Radio.Group name="type" onChange={this.onChangeType} value={this.state.type}>
                        <div>
                            <Radio value={"Broadcast to every one"}>Broadcast (Everyone will get news)</Radio>
                        </div>
                        <div>
                            <Radio value={"Broadcast to target group"}>Target group</Radio>
                            <Select disabled={this.state.type != "Broadcast to target group"} defaultValue="targetgroup" style={{ width: 120 }} onChange={this.handleChange}>
                                <Option value="targetgroup" disabled>
                                    Target group
                            </Option>
                                {this.state.targetgroups.map((targetgroup, key) => {
                                    return (
                                        <Option key={key} value={targetgroup.TargetGroupName}>{targetgroup.TargetGroupName}</Option>
                                    )
                                })}
                            </Select>
                        </div>
                    </Radio.Group>
                    <h5 className="pt-3">Select option</h5>
                    <Checkbox>Member that interested in this news type</Checkbox>
                    <br></br>
                    <div className="d-flex justify-content-between pt-3">
                        <Link push to={`/${this.state.data.system}/${this.state.data.systemid}/news/allnews`}>
                            <button className="btn btn-danger" >Back</button>
                        </Link>
                        <button className="btn btn-primary" onClick={this.onAnnounce}>Announce</button>
                    </div>
                </div>
            </Layout>

        );
    }
}

export default AnnouceNewsPage