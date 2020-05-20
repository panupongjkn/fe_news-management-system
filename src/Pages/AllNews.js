import React from 'react'
import Layout from '../Components/Layout'
import styled from 'styled-components';
import axios from 'axios'
import { EyeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'

const BoxNews = styled.div`
    border: 1px solid #A6A6A6;
    border-radius: 10px;
    cursor: pointer;
    background-color: white
`
const BoxAllNews = styled.div`
    background-color: #050042
`
const BoxBody = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* number of lines to show */
    -webkit-box-orient: vertical;
`
const BoxTitle = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    line-clamp:2
    -webkit-line-clamp: 2; /* number of lines to show */
    -webkit-box-orient: vertical;
`

const Button = styled.button`
    background-color: #050042;
    color: white;
    &:hover {
        color: white;
    }
`

class AllNewsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                system: "",
                systemid: 0,
                pageType: "news",
                page: "allnews",
            },
            news: [
                {
                    title: "ตารางนัดประเมินงานคลีนิก SW Process (5-8 May 2020)",
                    body: "การนัดคุยครั้งนี้ จะคุยกันโดยใช้ Microsoft team กลุ่ม INT206 ใน Channel ของกลุ่มโปรเจค ให้สมาชิกในทีม join meeting ที่อ.สร้างไว้ใน channel ตามเวลานัด อ.อาจจะเลท 1-25 นาที (จากการคุยกับกลุ่มก่อนหน้า) ...",
                    author: "Dr.Olarn",
                    postdate: "Post 05/05/2020"
                }
            ],
            newsdraft: [],
            newspublish: []
        }
    }
    async componentWillMount() {
        this.props.onLoading(true)
        const { system, systemid } = this.props.match.params
        await this.setState(prevState => ({
            data: {
                ...prevState.data,
                system: system,
                systemid: systemid,
            }
        }))
        axios.get(`${process.env.REACT_APP_BE_PATH}/news/all/draft?systemid=${this.state.data.systemid}`, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("JWT")
            }
        }).then(res => {
            this.setState({ newsdraft: res.data })
            axios.get(`${process.env.REACT_APP_BE_PATH}/news/all/publish?systemid=${this.state.data.systemid}`, {
                headers: {
                    'Authorization': "Bearer " + localStorage.getItem("JWT")
                }
            }).then(res => {
                this.setState({ newspublish: res.data })
                this.props.onLoading(false)
            })
        })
    }
    createMarkup = (body) => {
        return { __html: body };
    }
    render() {
        return (
            <Layout {...this.props} data={this.state.data}>
                <div className="container pt-2">
                    <h3>{this.state.data.system} - All news</h3>
                    <BoxAllNews className="col-12 py-3 px-5 rounded">
                        <h5 className="text-light">Draft</h5>
                        <div className="row">
                            {this.state.newsdraft.map((news) => {
                                return (
                                    <div className="col-4 p-2">
                                        <BoxNews className="shadow-sm p-3 ">
                                            <BoxTitle className="mb-2">
                                                <b>{news.Title}</b>
                                            </BoxTitle>
                                            <BoxBody className="mb-2">
                                                <div dangerouslySetInnerHTML={this.createMarkup(news.Body)} className='editor'></div>
                                            </BoxBody>
                                            {news.author}
                                            <p>{news.postdate}</p>
                                            <Link to={`/${this.state.data.system}/${this.state.data.systemid}/news/${news.Title}/${news.ID}`}>
                                                <Button className="btn px-3 d-flex ml-auto">
                                                    <EyeOutlined className="mr-2 " style={{ fontSize: "16px", paddingTop: "3px" }} />
                                                    <span style={{ fontSize: "14px" }}>Preview</span>
                                                </Button>
                                            </Link>
                                        </BoxNews>
                                    </div>
                                )
                            })}

                        </div>

                    </BoxAllNews>
                    <BoxAllNews className="col-12 py-3 px-5 rounded mt-3">
                        <h5 className="text-light">Publish</h5>
                        <div className="row">
                            {this.state.newspublish.map((news) => {
                                return (
                                    <div className="col-4 p-2">
                                        <BoxNews className="shadow-sm p-3 ">
                                            <BoxTitle className="mb-2">
                                                <b>{news.Title}</b>
                                            </BoxTitle>
                                            <BoxBody className="mb-2">
                                                <div dangerouslySetInnerHTML={this.createMarkup(news.Body)} className='editor'></div>
                                            </BoxBody>
                                            {news.author}
                                            <p>{news.postdate}</p>
                                            <Link to={`/${this.state.data.system}/${this.state.data.systemid}/news/${news.Title}/${news.ID}`}>
                                                <Button className="btn px-3 d-flex ml-auto">
                                                    <EyeOutlined className="mr-2 " style={{ fontSize: "16px", paddingTop: "3px" }} />
                                                    <span style={{ fontSize: "14px" }}>Preview</span>
                                                </Button>
                                            </Link>
                                        </BoxNews>
                                    </div>
                                )
                            })}
                        </div>
                    </BoxAllNews>
                </div>
            </Layout>
        )
    }
}

export default AllNewsPage