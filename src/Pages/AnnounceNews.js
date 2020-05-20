import React from 'react'
import { Radio, Select } from 'antd'
import Layout from '../Components/Layout'
import axios from 'axios'

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
            headers : {
                'Authorization': "Bearer " + localStorage.getItem("JWT")
            }
        }).then(res => {
            console.log(res.data)
            this.props.onLoading(false)
        })
    }
    render() {
        console.log(this.state)
        return (
            <Layout {...this.props} data={this.state.data}>
                <Radio.Group name="type" onChange={this.onChangeType} value={this.state.type}>
                    <div>
                        <Radio value={"Broadcast to every one"}>Broadcast (Every one will get news)</Radio>
                    </div>
                    <div>
                        <Radio value={"Broadcast to target group"}>B</Radio>
                        <Select disabled={this.state.type!="Broadcast to target group"} defaultValue="targetgroup" style={{ width: 120 }} onChange={this.handleChange}>
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
                <br></br>
                <button onClick={this.onAnnounce}>Announce</button>
            </Layout>

        );
    }
}

export default AnnouceNewsPage