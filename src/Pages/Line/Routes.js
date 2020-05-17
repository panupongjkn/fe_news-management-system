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
        const queryString = await decodeURIComponent(window.location.search).replace("?cache=12345&?liff.state=", "");
        let query = await new URLSearchParams(queryString)
        let path = await "/line/" + query.get("system") + "/" + query.get("systemid") + "/register"
        this.setState({
            path: path,
        })
    }
    render() {
        // if (this.state.redirect) {
        //     return <Redirect push to={this.state.path} />
        // }
        return (
            <div>
                Redirect to {this.state.path}
                <Link to={this.state.path}>
                    <button>Check</button>
                </Link>
            </div>
        )
    }
}

export default Routes