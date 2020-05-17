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
        let query = new URLSearchParams(this.props.location.search)
        let path = "/line/"+query.get("system")+"/"+query.get("systemid")+"/register"
        this.setState({
            path: path,
            redirect: true
        })
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