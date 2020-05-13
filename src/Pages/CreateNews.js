import React from 'react'
import Layout from '../Components/Layout'
import styled from 'styled-components'
import axios from 'axios'
import Swal from 'sweetalert2'

import CreateNewsComponent from '../Components/CreateNewsPage/CreateNews'
import CreateMessageComponent from '../Components/CreateNewsPage/CreateMessage'
import PreviewComponent from '../Components/CreateNewsPage/Preview'
import { Redirect } from 'react-router-dom'

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
                postdate: "",
                images: [],
                imagesUpload: [],
                newstypes: [],
            },
            step: 1,
            redirect: false,
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
        if (this.state.menu === "news") {
            if (this.state.step === 1) {
                return (
                    <CreateNewsComponent
                        news={this.state.news}
                        onChangeNews={this.onChangeNews}
                        onChangeForm={this.onChangeForm}
                        onChageChecked={this.onChageChecked}
                        // onChangeExpiredate={this.onChangeExpiredate}
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
        if (name === "expiredate") {
            let date = data._d
            value = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
        }
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
                    let newDate = new Date()
                    let postdate = newDate.getDate() + "/" + (newDate.getMonth() + 1) + "/" + newDate.getFullYear()
                    await this.setState(prevState => ({
                        news: {
                            ...prevState.news,
                            images: files,
                            imagesUpload: newfiles,
                            postdate: postdate,

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
        let files = this.state.news.imagesUpload
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
            expiredate: news.expiredate,
            images: images,
            newstypes: news.newstypes.filter(function (newstype) {
                return newstype.selected
            }),
            system: this.state.data.system,
            systemid: this.state.data.systemid,
            status: status
        }
        axios.post("http://localhost:8080/news/create", data, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("JWT")
            }
        }).then(res => {
            let title = ""
            if(status==="draft") title = "Draft news success"
            if(status==="Publish") title = "Create news success"
            Swal.fire({
                icon: 'success',
                title: title,
                showConfirmButton: true,
                timer: 3000
            }).then((result) => {
                this.setState({ redirect: true })
            })
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to={`/${this.state.data.system}/${this.state.data.systemid}/news/allnews`} />
        }
        return (
            <Layout {...this.props} data={this.state.data} >
                <div className="container pt-3">
                    <h3 className={`col-12 p-0 ${this.state.step === 1 ? "" : "d-none"}`}>Create news</h3>
                    <div className={`col-12 p-0 ${this.state.step === 1 ? "" : "d-none"}`}>
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