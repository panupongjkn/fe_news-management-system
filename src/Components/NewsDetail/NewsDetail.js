import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { Modal } from 'antd'

const NewsType = styled.div`
    border-radius: 20px;
    cursor: pointer;
    background-color: "white"};
    color: "rgb(0,0,0,0.65)"};
`

const ImageBox = styled.div`
    height: 200px;
    cursor: pointer;
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
const Title = styled.div`
    background-color: #EEEEEE;
`

class NewsDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            imageShow: "",
        }
    }

    showModal = (image) => {
        console.log("click")
        this.setState({
            imageShow: image,
            visible: true,
        });
    };

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    createMarkup = () => {
        return { __html: this.props.news.body };
    }
    render() {
        console.log("news", this.props.news)
        let postdate = moment(this.props.news.postdate).format("DD-MM-YYYY")
        let expiredate = moment(this.props.news.expiredate).format("DD-MM-YYYY")
        return (
            <div>
                <Title className="text-center mb-4 py-3 ">
                    <div className="container">
                        <h5>{this.props.news.title}</h5>
                    </div>
                </Title>
                <div className="container">
                    <div dangerouslySetInnerHTML={this.createMarkup()} className='editor'></div>
                    <div>
                        <div className={`pt-3 ${this.props.news.images.length === 0 ? "d-none" : ""}`}>
                            <div className="col-12">
                                <div className="row">
                                    {this.props.news.images.map((image, key) => {
                                        if (this.props.news.status === "preview") {
                                            return (
                                                <div className="col-12 col-sm-4 p-1 mb-3">
                                                    <ImageBox onClick={() => this.showModal(image)} >
                                                        <Image src={URL.createObjectURL(image)} />
                                                    </ImageBox>
                                                    <Modal
                                                        title="Image"
                                                        visible={this.state.visible}
                                                        onOk={this.handleOk}
                                                        onCancel={this.handleCancel}
                                                    >
                                                        <Image src={URL.createObjectURL(image)} />
                                                    </Modal>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div className="col-12 col-sm-4 p-1 mb-3">
                                                    <ImageBox onClick={() => this.showModal(image.ImageName)} >
                                                        <Image src={`${process.env.REACT_APP_STORAGE}/${image.ImageName}`} />
                                                    </ImageBox>
                                                    <Modal
                                                        title="Image"
                                                        visible={this.state.visible}
                                                        onOk={this.handleOk}
                                                        onCancel={this.handleCancel}
                                                    >
                                                        <Image src={`${process.env.REACT_APP_STORAGE}/${this.state.imageShow}`} />
                                                    </Modal>
                                                </div>
                                            )
                                        }
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="pt-3 pb-5">
                            <p>Postdate : {postdate}</p>
                            <p className={`${expiredate === "Invalid date" ? "d-none" : ""}`}>Expiredate : {expiredate}</p>
                            <p>
                                News types :
                                {this.props.news.newstypes.map((newstype, key) => {
                                if (this.props.news.status === "preview") {
                                    if (newstype.selected) {
                                        return (
                                            <NewsType key={key} className="border shadow-sm d-inline-block py-2 px-4 ml-2">
                                                {newstype.newstype}
                                            </NewsType>
                                        )
                                    }
                                } else {
                                    return (
                                        <NewsType key={key} className="border shadow-sm d-inline-block py-2 px-4 ml-2">
                                            {newstype.NewsTypeName}
                                        </NewsType>
                                    )
                                }
                            })}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsDetail