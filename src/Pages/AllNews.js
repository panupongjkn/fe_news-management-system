import React from 'react'
import Layout from '../Components/Layout'
import styled from 'styled-components';


const BoxNews = styled.div`
    border: 1px solid #A6A6A6;
    border-radius: 10px;
    cursor: pointer;
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
            ]
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
    render() {
        return (
            <Layout {...this.props} data={this.state.data}>
                <div className="container pt-2">
                    <h1>All news</h1>
                    <div className="col-12">
                        <div className="row">
                            {this.state.news.map((news) => {
                                return (
                                    <div className="col-3 p-2">
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

            </Layout>
        )
    }
}

export default AllNewsPage