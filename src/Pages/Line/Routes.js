import React from 'react'
import { Redirect, Link } from 'react-router-dom'

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
        const queryString = decodeURIComponent(window.location.search).replace("?liff.state=", "");
        let query = new URLSearchParams(queryString)
        let path = "/line/" + query.get("system") + "/" + query.get("systemid") + "/register"
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
                <p>userid: {this.state.line.userId}</p>
                <Link to={this.state.path+`?name=${this.state.line.displayName}&userid=${this.state.line.userId}&picture=${this.state.line.pictureUrl}&email=${this.state.line.email}`}>
                    <button>Check</button>
                </Link>
            </div>
        )
    }
}

export default Routes