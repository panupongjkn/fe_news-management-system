import React from 'react'
import Layout from '../Components/Layout'
class CreateNewsTypePage extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            data: {
                system: "",
                systemid: 0,
                pageType: "news",
                page: "createnewstype",
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
                <h1>Create news type</h1>
            </Layout>
        )
    }
}

export default CreateNewsTypePage