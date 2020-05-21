import React from 'react'
import { Input } from 'antd'
import axios from 'axios'
import styled from 'styled-components'

const liff = window.liff

const RoleBox = styled.div`
    background-color : ${props => props.selected ? "#050042" : "white"};
    color: ${props => props.selected ? "white" : "#050042"};
    cursor: pointer;
    border-radius: 50px;
`
const Bg = styled.div`
    min-height: 100vh;
    position: relative;
    background-image: url("/image/RegisterLine/bg-mobile.png");
    background-size: 100% 100%;
`
const InputName = styled(Input)`
    background-color: #E5E5E5;
    height: 40px;
    border-radius: 50px;
    &::placeholder {
        color: #808080;
    }
`
const ButtonNext = styled.button`
background-color: #050042;
color: white;
border: none;
padding: 10px 60px;
border-radius: 50px;
`
const ButtonBack = styled.button`
background-color: #050042;
color: white;
border: none;
border-radius: 50px;
`

const NameForm = (props) => {
    return (
        <Bg>
            <div className="text-center pt-5">
                <img src="/image/pic-regis 2.png" width="80%" />
            </div>
            <div className="container px-4">
                <h5 className="text-center pt-5">Register</h5>
                <form className="pt-4 text-center" onSubmit={props.onNextToRole}>
                    <InputName required onChange={props.onChangeName} value={props.user.fname} type="text" name="fname" placeholder="First name" />
                    <InputName required onChange={props.onChangeName} value={props.user.lname} className="mt-3" type="text" name="lname" placeholder="Last name" />
                    <ButtonNext className="submit mt-4">Next</ButtonNext>
                </form>
            </div>
        </Bg>
    )
}
const SelectRole = (props) => {
    return (
        <div className="text-center pt-5">
            <h5>Choose your role</h5>
            <span className={props.error ? "" : "d-none"} style={{ color: "red" }}>***Please choose your role</span>
            <div className="pt-5">
                <div className="col-12">
                    <div className="row">
                        {props.role.map((role, key) => {
                            return (
                                <div className="col-6">
                                    <RoleBox onClick={() => props.onSelectRole(role.ID)} selected={props.user.roleid === role.ID ? true : false} className="border shadow-sm py-2 mb-3" key={key}>
                                        {role.RoleName}
                                    </RoleBox>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="container d-flex justify-content-between pt-5">
                <ButtonBack onClick={props.onBackToFormName} className="bg-danger px-5 py-2">Back</ButtonBack>
                <ButtonNext onClick={props.onNextToNewsType} className="px-5 py-2">Next</ButtonNext>
            </div>
        </div>
    )
}
const SelectNewsType = (props) => {
    return (
        <div className="text-center pt-5">
            <h5>Choose your interest</h5>
            <span className={props.error ? "" : "d-none"} style={{ color: "red" }}>***Please choose your interest</span>
            <div className="pt-5">
                <div className="col-12">
                    <div className="row">
                        {props.newstype.map((newstype, key) => {
                            return (
                                <div className="col-6">
                                    <RoleBox onClick={() => props.onSelectNewsType(key)} selected={newstype.selected} className="border shadow-sm py-2 mb-3" key={key}>
                                        {newstype.NewsTypeName}
                                    </RoleBox>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="container d-flex justify-content-between pt-5">
                <ButtonBack onClick={props.onBackToSelectRole} className="px-5 py-2 bg-danger">Back</ButtonBack>
                <ButtonNext onClick={props.onRegister} className="px-5 py-2">Register</ButtonNext>
            </div>
        </div>
    )
}
class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
                fname: "",
                lname: "",
                roleid: 0,
                newsInterested: [],
            },
            line: {
                displayName: '',
                userId: '',
                pictureUrl: '',
                email: '',
            },
            systemid: '',
            component: 1,
            role: [],
            newstype: [],
            error: false,
        }
    }
    async componentDidMount() {
        await liff.init({ liffId: "1654010598-xR8ZnwJ2" })
        const profile = await liff.getProfile()
        const { system, systemid } = this.props.match.params
        await this.setState({
            line: {
                displayName: profile.displayName,
                userId: profile.userId,
                pictureUrl: profile.pictureUrl,
                email: liff.getDecodedIDToken().email
            },
            systemid: systemid
        })
        await axios.get(`${process.env.REACT_APP_BE_PATH}/role/all?systemname=${system}&systemid=${systemid}`).then(async res => {
            this.setState({ role: res.data })
            await axios.get(`${process.env.REACT_APP_BE_PATH}/news/newstype/allnewstype?systemname=${system}&systemid=${systemid}`).then(async res => {
                let newstypearr = []
                await res.data.forEach(newstype => {
                    let newstypedata = {
                        ...newstype,
                        selected: false
                    }
                    newstypearr.push(newstypedata)
                });
                this.setState({ newstype: newstypearr })
            })
        })
    }
    showComponent = () => {
        if (this.state.component === 1) {
            return <NameForm user={this.state.user} onChangeName={this.onChangeName} onNextToRole={this.onNextToRole} />
        } else if (this.state.component === 2) {
            return <SelectRole
                user={this.state.user}
                role={this.state.role}
                onSelectRole={this.onSelectRole}
                error={this.state.error}
                onNextToNewsType={this.onNextToNewsType}
                onBackToFormName={this.onBackToFormName} />
        } else {
            return <SelectNewsType
                user={this.state.user}
                newstype={this.state.newstype}
                onSelectNewsType={this.onSelectNewsType}
                onRegister={this.onRegister}
                onBackToSelectRole={this.onBackToSelectRole}
                error={this.state.error} />
        }
    }
    onChangeName = (e) => {
        let name = e.target.name
        let value = e.target.value
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                [name]: value
            }
        }))
    }
    onNextToRole = (e) => {
        e.preventDefault();
        this.setState({
            component: 2
        })
    }
    onSelectRole = (roleid) => {
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                roleid: roleid
            },
            error: false
        }))
    }
    onNextToNewsType = (e) => {
        e.preventDefault();
        if (this.state.user.roleid === 0) {
            this.setState({
                error: true
            })
        } else {
            this.setState({
                component: 3
            })
        }
    }
    onBackToFormName = (e) => {
        e.preventDefault();
        this.setState({
            component: 1,
            error: false,
        })
    }
    onSelectNewsType = async (key) => {
        let newstypes = this.state.newstype
        newstypes[key].selected = !newstypes[key].selected
        await this.setState(prevState => ({
            newstypes: newstypes,
            error: false,
        }))
    }
    onBackToSelectRole = (e) => {
        e.preventDefault();
        this.setState({
            component: 2,
            error: false,
        })
    }
    onRegister = async () => {
        let userinterest = await this.state.newstype.filter(function (newstype) {
            return newstype.selected;
        });
        console.log(userinterest.length)
        if (userinterest.length === 0) {
            this.setState({ error: true })
        } else {
            await this.setState(prevState => ({
                user: {
                    ...prevState.user,
                    newsInterested: userinterest
                },
                error: false,
            }))
            let data = {
                fname: this.state.user.fname,
                lname: this.state.user.lname,
                roleid: this.state.user.roleid,
                newsinterested: this.state.user.newsInterested,
                email: this.state.line.email,
                line: this.state.line.userId,
                systemid: this.state.systemid
            }
            this.props.onLoading(true)
            axios.post(`${process.env.REACT_APP_BE_PATH}/line/register`, data).then((res) => {
                this.props.onLoading(false)
                liff.closeWindow()
            }).catch(err => {
                this.props.onLoading(false)
                liff.closeWindow()
            })
        }
    }
    render() {
        return (
            <div>
                <p>check data : {this.state.line.userId}</p>
                {this.showComponent()}
            </div>
        )
    }
}

export default Register