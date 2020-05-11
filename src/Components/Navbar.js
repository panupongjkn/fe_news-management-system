import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

const Bar = styled.nav`
    background-color: white;
    width: 100%;
    height: 50px;
`

const Navbar = (props) => {
    let user = jwtDecode(localStorage.getItem("JWT"))
    let page = props.page
    return (
        <Bar
            className="navbar navbar-light shadow-sm justify-content-between"
            {...props}
        >
            <Link to='/' className={`navbar-brand p-0 ${page==""?"d-none":""}`}>
                <img src="/image/pic news.png" width="35px" height="35px" />
                <span className="ml-2" style={{ fontSize: "20px" }}>News Management</span>
            </Link>
            <div>
            </div>
            <div>
                Hi' {user.fname}
                <img src="/image/user-profile.png" className="ml-3" width="34px" height="34px" />
            </div>
        </Bar>
    )
}

export default Navbar