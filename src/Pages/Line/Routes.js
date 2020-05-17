import React from 'react'
import { Redirect, Link } from 'react-router-dom'

class Routes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            path: "",
            redirect: false,
        }
    }
    async componentDidMount() {
        const queryString = decodeURIComponent(window.location.search).replace("?liff.state=", "");
        let query = new URLSearchParams(queryString)
        let path = "/line/" + query.get("system") + "/" + query.get("systemid") + "/register"
        await this.setState({
            path: path,
            // redirect: true
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