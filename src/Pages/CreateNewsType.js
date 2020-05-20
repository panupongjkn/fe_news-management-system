import React from 'react'
import Layout from '../Components/Layout'
import styled from 'styled-components';
import { Input } from 'antd';
import axios from 'axios'

const Box = styled.div`
    height: 145px;
    border: 1px solid #A6A6A6;
    border-radius: 10px;
    cursor: pointer;
    text-align: center;
    padding-top: 60px;
`
const BoxAddNewsType = styled.div`
    height: 145px;
    border: 1px solid #A6A6A6;
    border-radius: 10px;
    cursor: pointer;
    text-align: center;
`
const ButtonAddNewsType = styled.div`
    background-color: #050042;
    border: none;
    border-radius: 10px;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    width: 77px;
    margin-top: 10px;
`

class CreateNewsTypePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                system: "",
                systemid: 0,
                pageType: "news",
                page: "createnewstype",
            },
            newstype: [],
            NewsType: ""
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
    async componentDidMount() {
        this.props.onLoading(true)
        await this.GetNewsTypes()
        this.props.onLoading(false)
    }
    GetNewsTypes = async () => {
        const { system, systemid } = this.props.match.params
        await axios.get(`${process.env.REACT_APP_BE_PATH}/news/newstype/allnewstype?systemid=${systemid}&systemname=${system}`, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("JWT")
            }
        }).then(res => {
            console.log(res.data)
            this.setState({ newstype: res.data })
        })
    }
    SetNewsType = (e) => {
        this.setState({
            NewsType: e.target.value
        })
    }
    AddNewsType = () => {
        const { systemid } = this.props.match.params
        let data = new FormData()
        data.append("systemid", systemid)
        data.append("newstypename", this.state.NewsType)
        axios.post(`${process.env.REACT_APP_BE_PATH}/news/newstype/create`, data, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("JWT")
            }
        }).then(res => {
            this.GetNewsTypes()
            this.setState({ NewsType: "" })
        })
    }
    render() {
        return (
            <Layout {...this.props} data={this.state.data}>
                <div className="container pt-4">
                    <h3>Create news type</h3>
                    <div className="col-12">
                        <div className="row">
                            <div className="col-3 p-2">
                                <BoxAddNewsType className="shadow-sm pt-3 px-3">
                                    <p>Add news type</p>
                                    <Input onChange={(e) => this.SetNewsType(e)} value={this.state.NewsType} placeholder="Enter type name" /><br />
                                    <ButtonAddNewsType onClick={this.AddNewsType} type="button">Add</ButtonAddNewsType>
                                </BoxAddNewsType>
                            </div>
                            {this.state.newstype.map((newstype) => {
                                return (
                                    <div className="col-3 p-2">
                                        <Box className="shadow-sm">
                                            {newstype.NewsTypeName}
                                        </Box>
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

export default CreateNewsTypePage