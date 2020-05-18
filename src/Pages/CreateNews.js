import React from 'react'
import Layout from '../Components/Layout'
import styled from 'styled-components'
import axios from 'axios'
import Swal from 'sweetalert2'
import moment from 'moment'
import { Redirect } from 'react-router-dom'

import CreateNewsComponent from '../Components/CreateNewsPage/CreateNews'
import CreateMessageComponent from '../Components/CreateNewsPage/CreateMessage'
import PreviewComponent from '../Components/CreateNewsPage/Preview'

const Menu = styled.button`
    background-color: ${props => props.selected ? "#050042" : "white"};
    color: ${props => props.selected ? "white" : "#050042"};
    border-radius : ${props => props.menu === "news" ? "20px 0px 0px 20px" : "0px 20px 20px 0px"};
    border: 1px solid ${props => props.selected ? "#050042" : "#A6A6A6"};
`


function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
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
                imagesUpload: [],
                newstypes: [],
                status: "preview",
                postdate: new Date()
            },
            step: 1,
            redirect: false,
            path: ""
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
        await axios.get(`${process.env.REACT_APP_BE_PATH}/news/newstype/allnewstype?systemid=${this.state.data.systemid}&systemname=${this.state.data.system}`, {
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
        if (this.state.menu === "news") {
            if (this.state.step === 1) {
                return (
                    <CreateNewsComponent
                        news={this.state.news}
                        onChangeNews={this.onChangeNews}
                        onChangeForm={this.onChangeForm}
                        onChageChecked={this.onChageChecked}
                        onSelectNewsType={this.onSelectNewsType}
                        onPreview={this.onPreview} />
                )
            } else {
                return (
                    <div>
                        <PreviewComponent
                            onDraft={this.onDraft}
                            onPublish={this.onPublish}
                            onForm={this.onForm}
                            news={this.state.news} />
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
    }
    onChangeForm = async (name, data) => { //files, ckeditor, expiredate
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
                checkExpiredate: !this.state.news.checkExpiredate,
                expiredate: ""
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
        if (this.state.news.title === "" || this.state.news.body === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter Title and Content',
            })
        } else {
            let newstypes = this.state.news.newstypes.filter(function (newstype) {
                return newstype.selected
            })
            if (newstypes.length === 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please select news type',
                })
            } else {
                if (this.state.news.checkExpiredate === true && this.state.news.expiredate === "") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Please select expiredate',
                    })
                } else {
                    let newfiles = await this.setFileImages(files)
                    await this.setState(prevState => ({
                        news: {
                            ...prevState.news,
                            images: newfiles,
                            imagesUpload: files,
                        },
                        step: 2
                    }))
                }
            }
        }
    }
    setFileImages = (files) => {
        let newsFiles = []
        for (let index = 0; index < files.length; index++) {
            newsFiles.push(files[index].originFileObj)
        }
        return newsFiles
    }
    onForm = () => {
        this.setState({ step: 1 })
    }
    onDraft = () => {
        this.onCreateNews("draft")
    }
    onPublish = () => {
        this.onCreateNews("publish")
    }
    imagesToBase64 = async () => {
        let files = this.state.news.images
        let images = []
        for (let index = 0; index < files.length; index++) {
            images.push(await getBase64(files[index]))
        }
        return images
    }
    onCreateNews = async (status) => {
        let news = this.state.news
        let images = await this.imagesToBase64()
        let data = {
            title: news.title,
            body: news.body,
            checkexpiredate: news.checkExpiredate,
            expiredate: moment(news.expiredate).format('DD-MM-YYYY'),
            images: images,
            newstypes: news.newstypes.filter(function (newstype) {
                return newstype.selected
            }),
            system: this.state.data.system,
            systemid: this.state.data.systemid,
            status: status
        }
        axios.post(`${process.env.REACT_APP_BE_PATH}/news/create`, data, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("JWT")
            }
        }).then(res => {
            let title = ""
            if (status === "draft") {
                Swal.fire({
                    icon: 'success',
                    title: "Draft news success",
                    showConfirmButton: true,
                    timer: 3000
                }).then((result) => {
                    this.setState({ redirect: true })
                })
            } else if (status === "publish") {
                Swal.fire({
                    icon: 'success',
                    title: "Draft news success",
                    showConfirmButton: true,
                    timer: 3000
                }).then((result) => {
                    Swal.fire({
                        title: "Do you want to announce the news?",
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes'
                    }).then((result) => {
                        if (result.value) {
                            this.setState({
                                path: `/${this.state.data.system}/${this.state.data.systemid}/news/${res.data}/announce`,
                                redirect: true,

                            })
                        } else {
                            this.setState({
                                path: `/${this.state.data.system}/${this.state.data.systemid}/news/allnews`,
                                redirect: true,
                            })
                        }
                    })
                })
            }
        }).catch(err => {
            if (err.response) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data,
                })
            }
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to={this.state.path} />
        }
        return (
            <Layout {...this.props} data={this.state.data} >
                <div className="container pt-3">
                    <h3 className={`col - 12 p - 0 ${this.state.step === 1 ? "" : "d-none"}`}>Create news</h3>
                    <div className={`col - 12 p - 0 ${this.state.step === 1 ? "" : "d-none"}`}>
                        <div className="row">
                            <div className="col pr-0">
                                <Menu
                                    onClick={() => this.ChangeForm("news")}
                                    menu="news"
                                    selected={this.state.menu === "news" ? true : false}
                                    className="col-12 py-1">
                                    Create news
                                </Menu>
                            </div>
                            <div className="col pl-0">
                                <Menu
                                    onClick={() => this.ChangeForm("message")}
                                    menu="message"
                                    selected={this.state.menu === "message" ? true : false}
                                    className="col-12 py-1">
                                    Create meassge
                                </Menu>
                            </div>
                        </div>
                    </div>
                    <div className="pt-3 pb-5">
                        {this.ShowComponent()}
                    </div>
                </div>
            </Layout >
        )
    }
}

export default CreateNewsPage