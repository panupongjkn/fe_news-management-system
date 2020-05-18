import React from 'react'
import axios from 'axios'

import NewsDetail from '../Components/NewsDetail/NewsDetail'

class News extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            news: {
                title: "",
                body: "",
                expiredate: "",
                imagesUpload: [],
                images: [],
                newstypes: [],
                postdate: "",
                status: "newsdetail",
            },
            system: '',
            systemid: '',
        }
    }
    componentDidMount() {
        const { newsid, system, systemid } = this.props.match.params
        axios.get(`${process.env.REACT_APP_BE_PATH}/news/${newsid}`).then(res => {
            console.log(res.data)
            let news = res.data
            let postdate = new Date()
            if (news.status === "publish") {
                postdate = news.CreatedAt
            }
            this.setState({
                news: {
                    title: news.Title,
                    body: news.Body,
                    expiredate: news.ExpireDate,
                    images: news.Image,
                    newstypes: news.TypeOfNews,
                    postdate: postdate
                },
                system: system,
                systemid: systemid
            })
        })
    }
    createMarkup = () => {
        return { __html: this.state.news.body };
    }
    render() {
        return (
            <div>
                <NewsDetail news={this.state.news} system={this.state.system} systemid={this.state.systemid} />
            </div>
        )
    }
}

export default News