import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Link } from 'react-router-dom'

import withAuth from '../HOC/withAuth'

import Navbar from '../Components/Navbar'

const SystemBox = styled.div`
    height: 150px;
    background-color:white;
    cursor:pointer;
    `
const Background = styled.div`
 min-height: 100vh;
    background: linear-gradient(
        to top,
        white 0%,
        white 60%,
        #050042 60%,
        #050042 100%
      );
`
class SystemsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            systems: [{}]
        }
    }

    componentDidMount() {
        console.log(process.env.BE_PATH)
        let header = {
            Authorization: "Bearer " + localStorage.getItem("JWT")
        }
        axios.get(`${process.env.REACT_APP_BE_PATH}/system/allsystem`, { headers: header }).then(res => {
            console.log(res.data)
            this.setState({
                systems: res.data
            })
        })
    }
    render() {
        return (
            <div>
                <Background>
                    <Navbar page="allsystem" />
                    <div className='container pt-5'>
                        <div className='col-10 mx-auto'>
                            <div className='col-12'>
                                <h3 className='text-light'>All systems</h3>
                                <div className='row'>
                                    <div className='col-4 p-2'>
                                        <Link to="/system/create">
                                            <SystemBox className='p-3 rounded shadow-sm'>
                                                +
                                                Add System
                                            </SystemBox>
                                        </Link>
                                    </div>
                                    {this.state.systems.map((system) => {
                                        return (
                                            <div className='col-4 p-2'>
                                                <a href={`/${system.SystemName}/${system.ID}/home`}>
                                                    <SystemBox className='p-3 rounded shadow-sm'>
                                                        {system.SystemName}
                                                    </SystemBox>
                                                </a>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </Background>
            </div>
        )
    }
}

export default withAuth(SystemsPage)