import React from 'react'
import styled from 'styled-components'

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
                images: [],
                newstypes: []
            }
        }
    }
    componentDidMount() {
        try {
            const { system, systemid } = this.props.match.params
        } catch (error) {
            this.setState({
                news: {
                    title: this.props.news.title,
                    body: this.props.news.body,
                    expiredate: this.props.news.expiredate,
                    images: this.props.news.images,
                    newstypes: this.props.news.newstypes
                }
            })
        }
    }
    createMarkup = () => {
        return { __html: this.state.news.body };
    }
    render() {
        console.log("Show", this.state)
        return (
            <div>
                <div className="text-center mb-5">
                    <h5>{this.state.news.title}</h5>
                </div>
                <div dangerouslySetInnerHTML={this.createMarkup()} className='editor'></div>
                <div className="pt-5">
                    <div className="col-12">
                        <div className="row">
                            {this.state.news.images.map((image, key) => {
                                return (
                                    <ImageBox className="col-12 col-sm-4 p-1 mb-3">
                                        <Image src={URL.createObjectURL(image.originFileObj)} />
                                    </ImageBox>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="pt-3">
                    <p>Postdate : </p>
                    <p className={`${this.state.expiredate == "" ? "d-none" : ""}`}>Expiredate : </p>
                    <p>
                        News types :
                        {this.state.news.newstypes.map((newstype, key) => {
                        return (
                            <NewsType className="border shadow-sm d-inline-block py-2 px-4 ml-2">
                                {newstype.newstype}
                            </NewsType>
                        )
                    })}
                    </p>
                </div>
            </div>
        )
    }
}

export default News