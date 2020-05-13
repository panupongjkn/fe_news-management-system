import React from 'react'
import Layout from '../Components/Layout'
import styled from 'styled-components'
import axios from 'axios'
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'

const BoxNews = styled.div`
    border: 1px solid #A6A6A6;
    border-radius: 10px;
    cursor: pointer;
`
const BoxNewsType = styled.div`
    height: 145px;
    border: 1px solid #A6A6A6;
    border-radius: 10px;
    cursor: pointer;
    text-align: center;
    padding-top: 60px;
`
const BoxCreateTargetGroup = styled.div`
    height: 145px;
    border: 1px solid #A6A6A6;
    border-radius: 10px;
    cursor: pointer;
    text-align: center;
    padding-top: 60px;
`

class HomeSystemPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                system: "",
                systemid: 0,
                pageType: "",
                page: "home",
            },
            news: [
                {
                    title: "ตารางนัดประเมินงานคลีนิก SW Process (5-8 May 2020)",
                    body: "การนัดคุยครั้งนี้ จะคุยกันโดยใช้ Microsoft team กลุ่ม INT206 ใน Channel ของกลุ่มโปรเจค ให้สมาชิกในทีม join meeting ที่อ.สร้างไว้ใน channel ตามเวลานัด อ.อาจจะเลท 1-25 นาที (จากการคุยกับกลุ่มก่อนหน้า) ...",
                    author: "Dr.Olarn",
                    postdate: "Post 05/05/2020"
                }
            ],
            targetgroups: [],
            newstype: [],
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
        this.GetNewsTypes()

    }
    GetNewsTypes = () => {
        const { system, systemid } = this.props.match.params
        axios.get(`http://localhost:8080/news/newstype/allnewstype?systemid=${systemid}&systemname=${system}`, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("JWT")
            }
        }).then(res => {
            console.log("newstypes", res.data)
            this.setState({ newstype: res.data })
        })
    }
    GetTargetGroups = () => {
        const { system, systemid } = this.props.match.params
        axios.get(`http://localhost:8080/targetgroup/all?systemid=${systemid}&systemname=${system}`, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("JWT")
            }
        }).then(res => {
            console.log("targetgroup" + res.data)
            this.setState({ targetgroups: res.data })
        })
    }


    render() {
        return (
            <Layout {...this.props} data={this.state.data}>
                <div className="container pt-2">
                    <h1>{this.state.data.system}</h1>
                    <div>
                        <h2>News</h2>
                        <div className="col-12">
                            <div className="row">
                                {this.state.news.map((news) => {
                                    return (
                                        <div className="col-4 p-2">
                                            <BoxNews className="shadow-sm pt-3 px-3">
                                                <h5>{news.title}</h5>
                                                <p>{news.body}</p>
                                                <p>{news.author}</p>
                                                <p>{news.postdate}</p>
                                            </BoxNews>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2>News type</h2>
                        <div className="col-12">
                            <div className="row">
                                {this.state.newstype.map((newstype) => {
                                    return (
                                        <div className="col-3 p-2">
                                            <BoxNewsType className="shadow-sm">
                                                {newstype.NewsTypeName}
                                            </BoxNewsType>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                    </div>
                    <div>
                        <h2>Target group</h2>
                        <div className="col-12">
                            <div className="row">
                                {this.state.targetgroups.map((targetgroup) => {
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

                </div>
            </Layout>
        )
    }
}

export default HomeSystemPage