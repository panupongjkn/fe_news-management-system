import React from 'react'

class HomeSystemPage extends React.Component {
    render() {
        const { system } = this.props.match.params
        return (
            <h1>{system}</h1>
        )
    }
}

export default HomeSystemPage