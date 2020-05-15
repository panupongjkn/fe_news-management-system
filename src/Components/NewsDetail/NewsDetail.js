import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import axios from 'axios'
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

const NewsDetail = (props) => {
    function createMarkup() {
        return { __html: props.news.body };
    }
    console.log("news",props.news)
    let postdate = moment(props.news.postdate).format("DD-MM-YYYY")
    let expiredate = moment(props.news.expiredate).format("DD-MM-YYYY")
    return (
        <div>
            <div className="text-center mb-4">
                <h5>{props.news.title}</h5>
            </div>
            <div dangerouslySetInnerHTML={createMarkup()} className='editor'></div>
            <div>
                <div className={`pt-5 ${props.news.images.length === 0 ? "d-none" : ""}`}>
                    <div className="col-12">
                        <div className="row">
                            {props.news.images.map((image, key) => {
                                if (props.news.status == "preview") {
                                    return (
                                        <ImageBox className="col-12 col-sm-4 p-1 mb-3">
                                            <Image src={URL.createObjectURL(image)} />
                                        </ImageBox>
                                    )
                                } else {
                                    return (
                                        <ImageBox className="col-12 col-sm-4 p-1 mb-3">
                                            <Image src={`/image/News/${image.ImageName}`} />
                                        </ImageBox>
                                    )
                                }
                            })}
                        </div>
                    </div>
                </div>
                <div className="pt-3">
                    <p>Postdate : {postdate}</p>
                    <p className={`${expiredate === "Invalid date" ? "d-none" : ""}`}>Expiredate : {expiredate}</p>
                    <p>
                        News types :
                        {props.news.newstypes.map((newstype, key) => {
                        if (props.news.status == "preview") {
                            if (newstype.selected) {
                                return (
                                    <NewsType className="border shadow-sm d-inline-block py-2 px-4 ml-2">
                                        {newstype.newstype}
                                    </NewsType>
                                )
                            }
                        } else {
                            return (
                                <NewsType className="border shadow-sm d-inline-block py-2 px-4 ml-2">
                                    {newstype.NewsTypeName}
                                </NewsType>
                            )
                        }
                    })}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default NewsDetail