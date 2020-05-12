import React from 'react'
import Layout from '../Components/Layout'
import styled from 'styled-components'
import axios from 'axios'
import Swal from 'sweetalert2'

import CreateNewsComponent from '../Components/CreateNewsPage/CreateNews'
import CreateMessageComponent from '../Components/CreateNewsPage/CreateMessage'
import PreviewComponent from '../Components/CreateNewsPage/Preview'

const Menu = styled.button`
    background-color: ${props => props.selected ? "#050042" : "white"};
    color: ${props => props.selected ? "white" : "#050042"};
    border-radius : ${props => props.menu == "news" ? "20px 0px 0px 20px" : "0px 20px 20px 0px"};
    border: 1px solid ${props => props.selected ? "#050042" : "#A6A6A6"};
`
class CreateNewsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                system: "",
                systemid: 0,
                pageType: "news",
                page: "createnews",
            },
            menu: "news",
            news: {
                title: "",
                body: "",
                checkExpiredate: false,
                expiredate: "",
                images: [],
                newstypes: [],
            },
            step: 1,
        }
    }
    async componentWillMount() {
        const { system, systemid } = this.props.match.params
        await this.setState(prevState => ({
            data: {
                ...prevState.data,
                system: system,
                systemid: systemid,
            }
        }))
    }
    async componentDidMount() {
        await axios.get(`http://localhost:8080/news/newstype/allnewstype?systemid=${this.state.data.systemid}&systemname=${this.state.data.system}`, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("JWT")
            }
        }).then(async res => {
            console.log(res.data)
            if (res.data) {
                let newstypes = await this.setNewsType(res.data)
                await this.setState(prevState => ({
                    news: {
                        ...prevState.news,
                        newstypes: newstypes
                    }
                }))
            }
        })
    }
    setNewsType = (data) => {
        let newstypes = []
        for (let index = 0; index < data.length; index++) {
            let newstype1 = data[index]
            let newstype2 = {
                id: newstype1.ID,
                newstype: newstype1.NewsTypeName,
                selected: false,
            }
            newstypes.push(newstype2)
        }
        return newstypes
    }
    ChangeForm = async (menu) => {
        await this.setState({
            menu: menu
        })
    }
    ShowComponent = () => {
        if (this.state.menu == "news") {
            if (this.state.step == 1) {
                return (
                    <CreateNewsComponent
                        news={this.state.news}
                        onChangeNews={this.onChangeNews}
                        onChangeForm={this.onChangeForm}
                        onChageChecked={this.onChageChecked}
                        onChangeExpiredate={this.onChangeExpiredate}
                        onSelectNewsType={this.onSelectNewsType}
                        onPreview={this.onPreview} />
                )
            } else {
                return (
                    <div>
                        <PreviewComponent onForm={this.onForm} news={this.state.news} />
                    </div>
                )
            }
        } else {
            return <CreateMessageComponent />
        }
    }
    onChangeNews = async (e) => {
        let stateName = e.target.name
        let value = e.target.value
        await this.setState(prevState => ({
            news: {
                ...prevState.news,
                [stateName]: value
            }
        }))
        console.log(this.state.images)
    }
    onChangeForm = async (name, data) => {
        let stateName = name
        let value = data
        await this.setState(prevState => ({
            news: {
                ...prevState.news,
                [stateName]: value
            }
        }))
    }
    onChageChecked = async () => {
        await this.setState(prevState => ({
            news: {
                ...prevState.news,
                checkExpiredate: !this.state.news.checkExpiredate
            }
        }))
    }
    onSelectNewsType = async (key) => {
        let newstypes = this.state.news.newstypes
        newstypes[key].selected = !newstypes[key].selected
        await this.setState(prevState => ({
            news: {
                ...prevState.news,
                newstypes: newstypes
            }
        }))
    }
    onPreview = async (files) => {
        if (this.state.news.title == "" || this.state.news.body == "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href>Why do I have this issue?</a>'
            })
        } else {
            let newstypes = this.state.news.newstypes.filter(function (newstype) {
                return newstype.selected
            })
            if (newstypes.length == 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href>Why do I have this issue?</a>'
                })
            } else {
                if (this.state.news.checkExpiredate == true && this.state.news.expiredate == "") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                        footer: '<a href>Why do I have this issue?</a>'
                    })
                } else {
                    await this.setState(prevState => ({
                        news: {
                            ...prevState.news,
                            images: files
                        },
                        step: 2
                    }))
                }
            }
        }
    }
    onForm = () => {
        this.setState({step:1})
    }
    render() {
        return (
            <Layout {...this.props} data={this.state.data} >
                <div className="container">
                    <h3 className={`col-12 p-0 ${this.state.step == 1 ? "" : "d-none"}`}>Create news</h3>
                    <div className={`col-12 p-0 ${this.state.step == 1 ? "" : "d-none"}`}>
                        <div className="row">
                            <div className="col pr-0">
                                <Menu
                                    onClick={() => this.ChangeForm("news")}
                                    menu="news"
                                    selected={this.state.menu == "news" ? true : false}
                                    className="col-12 py-1">
                                    Create news
                                </Menu>
                            </div>
                            <div className="col pl-0">
                                <Menu
                                    onClick={() => this.ChangeForm("message")}
                                    menu="message"
                                    selected={this.state.menu == "message" ? true : false}
                                    className="col-12 py-1">
                                    Create meassge
                                </Menu>
                            </div>
                        </div>
                    </div>
                    <div className="pt-3">
                        {this.ShowComponent()}
                    </div>
                </div>
            </Layout >
        )
    }
}

export default CreateNewsPage