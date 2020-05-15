import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import axios from 'axios'

import NewsDetail from '../Components/NewsDetail/NewsDetail'

const NewsType = styled.div`
    border-radius: 20px;
    cursor: pointer;
    background-color: "white"};
    color: "rgb(0,0,0,0.65)"};
`

const ImageBox = styled.div`
    height: 200px;
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

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
            }
        }
    }
    componentDidMount() {
            const { system, systemid, newsid } = this.props.match.params
            axios.get(`${process.env.REACT_APP_BE_PATH}/news/${newsid}`).then(res => {
                console.log(res.data)
                let news = res.data
                let postdate = new Date()
                if (news.status == "publish") {
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
                    }
                })
            })
    }
    createMarkup = () => {
        return { __html: this.state.news.body };
    }
    render() {
        return (
            <div className="container">
                <NewsDetail news={this.state.news}/>
            </div>
        )
    }
}

export default News