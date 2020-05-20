import React from 'react'
import styled from 'styled-components'
import { Spin, Space } from 'antd';

const Box = styled.div`
    width: 100vw; 
    height: 100vh; 
    background-color: rgb(255,255,255,0.95);
    z-index: 100;
    position: fixed;
    overflow-x: hidden;
    overflow-y: hidden;
`
class Loading extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Box className={`${this.props.display?"":"d-none"}`}>
                <div
                    style={{
                        position: 'absolute', left: '50%', top: '90%',
                        transform: 'translate(-50%, -50%)',
                        width: "100%",
                        height:"100%"
                    }}
                    className="text-center"
                >
                    <Spin size="large"/>
                    <h3 className="pt-3">Loading...</h3>
                </div>
            </Box>
        )
    }
}

export default Loading