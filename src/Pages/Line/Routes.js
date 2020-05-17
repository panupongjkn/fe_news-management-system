import React from 'react'
import { Redirect } from 'react-router-dom'

const liff = window.liff

class Routes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            path: "",
            redirect: false,
            name: '',
            userLineID: '',
            pictureUrl: '',
            statusMessage: '',
            languageDevice: '',
            versionSDK: '',
            client: '',
            isLogin: '',
            os: '',
            accessToken: '',
            email: ''
        }
    }
    async componentDidMount() {
        // const queryString = decodeURIComponent(window.location.search).replace("?liff.state=", "");
        // let query = new URLSearchParams(queryString)
        // let path = "/line/" + query.get("system") + "/" + query.get("systemid") + "/register"
        await liff.init({ liffId: "1654010598-xR8ZnwJ2"})
        await this.setState({
            // path: path,
            // redirect: true
            os: liff.getOS(),
            languageDevice: liff.getLanguage(),
            versionSDK: liff.getVersion(),
            accessToken: liff.getAccessToken(),
            client: liff.isInClient()
        })
        const profile = await liff.getProfile()
        // const email = liff.getDecodedIDToken().email()
        this.setState({
            pictureUrl: profile.pictureUrl,
            userLineID: profile.userId,
            statusMessage: profile.statusMessage,
            // email: email,
        })
        
    }
    // getProfile = async () => {
    //     liff.getProfile().then(async dataInfo => {
    //         await this.setState({
    //             name: dataInfo.displayName,
    //             userLineID: dataInfo.userId,
    //             pictureUrl: dataInfo.pictureUrl,
    //             statusMessage: dataInfo.statusMessage
    //         });
    //     });

    //     const languageDevice = liff.getLanguage();
    //     const versionSDK = liff.getVersion();
    //     const client = liff.isInClient();
    //     const isLogin = liff.isLoggedIn();
    //     const os = liff.getOS();

    //     console.log(this.state)
    //     await this.setState({
    //         languageDevice: languageDevice,
    //         versionSDK: versionSDK,
    //         client: (client === true) ? 'YES' : 'NO',
    //         isLogin: (isLogin === true) ? 'Login' : 'Not Login',
    //         os: os
    //     });
    //     console.log(this.state)
    // }

    render() {
        // if (this.state.redirect) {
        //     return <Redirect push to={this.state.path} />
        // }
        return (
            <div>
                Redirect to {this.state.path}
                <p>os: {this.state.os}</p>
                <p>lang: {this.state.languageDevice}</p>
                <p>version: {this.state.versionSDK}</p>
                <p>token: {this.state.accessToken}</p>
                <p>client: {this.state.client}</p>
                <p>pictureUrl: <img src={this.state.pictureUrl}/></p>
                <p>userId: {this.state.userLineID}</p>
                <p>status: {this.state.statusMessage}</p>
                <p>email: {this.state.email}</p>
            </div>
        )
    }
}

export default Routes