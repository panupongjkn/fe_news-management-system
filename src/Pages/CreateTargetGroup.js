import React from 'react'
import Layout from '../Components/Layout'
class CreateTargetGroupPage extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            data: {
                system: "",
                systemid: 0,
                pageType: "targetgroup",
                page: "createtargetgroup",
            }
        }
    }
    async componentWillMount() {
        const { system, systemid } = this.props.match.params
        console.log(system)
        await this.setState(prevState => ({
            data : {
                ...prevState.data,
                system: system,
                systemid: systemid,
            }
        }))
    }
    render() {
        return (
            <Layout {...this.props} data={this.state.data}>
                <h1>Create target group</h1>
            </Layout>
        )
    }
}

export default CreateTargetGroupPage