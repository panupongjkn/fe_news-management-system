import React from 'react'
import { Redirect, Link } from 'react-router-dom'

const liff = window.liff
class Routes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            path: "",
            redirect: false,
            line: {
                displayName: '',
                userId: '',
                pictureUrl: '',
                email: ''
            }
        }
    }
    async componentDidMount() {
        const queryString = await decodeURIComponent(window.location.search).replace("?liff.state=", "");
        let query = await new URLSearchParams(queryString)
        if (query.get("system") !== null) {
            await localStorage.setItem("system", query.get("system"))
            await localStorage.setItem("systemid", query.get("systemid"))
        } else {
            let path = await "/line/" + localStorage.getItem("system") + "/" + localStorage.getItem("systemid") + "/register"
            await this.setState({
                path: path,
            })
            localStorage.clear()
        }
    }
    getProfile = () => {
        await liff.init({ liffId: "1654010598-xR8ZnwJ2" })
        const profile = await liff.getProfile()
        await this.setState({
            path: path,
            line: {
                displayName: profile.displayName,
                userId: profile.userId,
                pictureUrl: profile.pictureUrl,
                email: liff.getDecodedIDToken().email
            }
        })
    }
    render() {
        // if (this.state.redirect) {
        //     return <Redirect push to={this.state.path} />
        // }
        return (
            <div>
                Redirect to {this.state.path}
                <button onClick={this.getProfile}>Get</button>
                <Link to={this.state.path}>
                    <button>Check</button>
                </Link>
            </div>
        )
    }
}

export default Routes