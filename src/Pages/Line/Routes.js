import React from 'react'
import {Redirect} from 'react-router-dom'

class Routes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            path: "",
            redirect: false,
        }
    }
    componentDidMount() {
        const queryString = decodeURIComponent(window.location.search).replace("?cache=1234?liff.state=", "");
        let query = new URLSearchParams(queryString)
        let path = "/line/"+query.get("system")+"/"+query.get("systemid")+"/register"
        this.setState({
            path: path,
            redirect: true
        })
        console.log("query", window.location.search)
        console.log("query2", query)
    }
    render() {
        // if(this.state.redirect){
        //     return <Redirect push to={this.state.path}/>
        // }
        return (
            <div>
                {this.state.path}
            </div>
        )
    }
}

export default Routes