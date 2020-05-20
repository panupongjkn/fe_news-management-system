import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

import {ButtonLogin} from '../Components/Login/Button'

const Page = styled.div`
    height: 100vh;
    position: relative;
    background-image: url("image/Login/bg-mobile.png");
    background-size: 100% 100%;
`

const Content = styled.div`
    position: relative;
    top: 45%;
    left: 50%;
    /* bring your own prefixes */
    transform: translate(-50%, -50%);
    @media screen and (max-width 575px) {
        position: fixed;
    }
`
const ImageContent = styled.img`
    height: 100vh;
    width: auto;
    @media screen and (max-width 1200px) {
        height: auto;
        width: 100%;
    }
`

class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            login: false,
            register: false,
            userid: "",
        }
    }
    async componentDidMount() {
        this.props.onLoading(true)
        if (localStorage.getItem("JWT") !== null) {
            this.setState({ login: true })
            this.props.onLoading(false)
        } else {
            if (new URLSearchParams(this.props.location.search).get("code") !== null) {
                let data = new FormData()
                data.append("code", new URLSearchParams(this.props.location.search).get("code"))
                await axios.post(`${process.env.REACT_APP_BE_PATH}/linelogin`, data)
                .then(async(res) => {
                    localStorage.setItem("JWT", res.data)
                    await this.setState({ 
                        login: true 
                    })
                    this.props.onLoading(false)
                })
                .catch(async err => {
                    if (err.response) {
                        await this.setState({
                            userid: err.response.data,
                            register: true
                        })
                        this.props.onLoading(false)
                    }
                })
            }
        }
    }
    render() {
        if (this.state.login) {
            return <Redirect push to="/systems" />
        }
        if (this.state.register) {
            return <Redirect push to={{ pathname: "/register", state: { userid: this.state.userid } }} />
        }
        return (
            <div className="col-12">
                {new URLSearchParams(this.props.location.search).get("code") ? "" :
                    <div className='row'>
                        <div className='col-7 d-none d-sm-block text-center'>
                            <ImageContent src="image/pic news.png" alt="pic news" />
                        </div>
                        <Page className="col-12 col-sm-5">
                            <Content className="col-10 p-0">
                                <div className="col-8 p-0 mx-auto d-sm-none">
                                    <img src="image/pic news.png" alt="pic news" width="100%" />
                                </div>
                                <h3 className="text-center"><b>SIGN IN</b></h3>
                                <div className="col-10 p-0 mx-auto">
                                    <div className="mb-3">
                                        <a href={`https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${process.env.REACT_APP_CHANNEL_ID_LOGIN}&redirect_uri=${process.env.REACT_APP_FE_PATH}/login&state=12345abcde&scope=profile%20openid&nonce=09876xyz`}>
                                            <ButtonLogin>Line</ButtonLogin>
                                        </a>
                                    </div>
                                    <div className="mb-3"><ButtonLogin>Facebook</ButtonLogin></div>
                                    <div><ButtonLogin>Google</ButtonLogin></div>
                                </div>
                            </Content>
                        </Page>
                    </div>
                }
            </div>
        )
    }
}

export default LoginPage