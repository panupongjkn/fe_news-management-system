import React from 'react'

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
        let path = "/line/"+query.system+"/"+query.systemid+"/register"
        this.setState({
            path: path,
            redirect: true
        })
    }
    render() {
        return (
            <div>
                {this.state.path}
            </div>
        )
    }
}