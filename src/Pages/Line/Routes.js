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
        let query = await new URLSearchParams(window.location.search)
        if(query.get("liff.state") == null ) {
            await this.setState({
                redirect: true,
            })
        }
        await liff.init({ liffId: "1654010598-xR8ZnwJ2" })
        const profile = await liff.getProfile()
        await this.setState({
            line: {
                displayName: profile.displayName,
                userId: profile.userId,
                pictureUrl: profile.pictureUrl,
                email: liff.getDecodedIDToken().email
            }
        })
    }
render() {
    if (this.state.redirect) {
        return <Redirect push to="/login" />
    }
    return (
        <div>
            {/* Redirect to {this.state.path}
            <p>userid: {this.state.line.userId}</p>
            <button onClick={this.getProfile}>Get</button>
            <Link to={this.state.path}>
                <button>Check</button>
            </Link> */}
        </div>
    )
}
}

export default Routes