import React from 'react'
import { Input } from 'antd'
import axios from 'axios'
import styled from 'styled-components'

const liff = window.liff

const RoleBox = styled.div`
    background-color : ${props => props.selected ? "#050042" : "white"};
    color: ${props => props.selected ? "white" : "#050042"};
    cursor: pointer;
`

const NameForm = (props) => {
    return (
        <div>
            <h5 className="text-center pt-5">Register</h5>
            <form className="pt-5 text-center" onSubmit={props.onNextToRole}>
                <Input required onChange={props.onChangeName} value={props.user.fname} type="text" name="fname" placeholder="First name" />
                <Input required onChange={props.onChangeName} value={props.user.lname} className="mt-3" type="text" name="lname" placeholder="Last name" />
                <button className="btn btn-primary mt-5">Next</button>
            </form>
        </div>
    )
}
const SelectRole = (props) => {
    return (
        <div className="text-center pt-5">
            <h5>Select your role</h5>
            <span className={props.error ? "" : "d-none"} style={{ color: "red" }}>***Please select your role</span>
            <div className="pt-5 container">
                <div>

                    {props.role.map((role, key) => {
                        return (
                            <RoleBox onClick={() => props.onSelectRole(role.ID)} selected={props.user.roleid === role.ID ? true : false} className="border rounded py-2 mb-3" key={key}>
                                {role.RoleName}
                            </RoleBox>
                        )
                    })}
                </div>
                <div className="d-flex justify-content-between pt-5">
                    <button onClick={props.onBackToFormName} className="btn btn-danger">Back</button>
                    <button onClick={props.onNextToNewsType} className="btn btn-primary">Next</button>
                </div>
            </div>
        </div>
    )
}
const SelectNewsType = (props) => {
    return (
        <div className="text-center pt-5">
            <h5>Select news type that you interest</h5>
            <span className={props.error ? "" : "d-none"} style={{ color: "red" }}>***Please select that you are interest</span>
            <div className="pt-5">
                {props.newstype.map((newstype, key) => {
                    return (
                        <RoleBox onClick={() => props.onSelectNewsType(key)} selected={newstype.selected} className="border rounded py-2 mb-3" key={key}>
                            {newstype.NewsTypeName}
                        </RoleBox>
                    )
                })}
            </div>
            <div className="d-flex justify-content-between pt-5">
                <button onClick={props.onBackToSelectRole} className="btn btn-danger">Back</button>
                <button onClick={props.onRegister} className="btn btn-success">Register</button>
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
            newstypes: newstypes
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
        }
        let data = {
            fname: this.state.user.fname,
            lname: this.state.user.lname,
            roleid: this.state.user.roleid,
            newsinterested: this.state.user.newsInterested,
            email: this.state.line.email,
            line: this.state.line.userId,
            systemid: this.state.systemid
        }
        axios.post(`${process.env.REACT_APP_BE_PATH}/line/register`, data).then((res) => {
            liff.closeWindow()
        }).catch(err => {
            liff.closeWindow()
        })
    }
    render() {
        return (
            <div className="container pt-5">
                <p>systemid: {this.state.systemid}</p>
                {this.showComponent()}
            </div>
        )
    }
}

export default Register