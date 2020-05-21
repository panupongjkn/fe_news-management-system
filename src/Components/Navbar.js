import React from 'react'
import styled from 'styled-components'
import { Menu, Dropdown } from 'antd';
import { Link, Redirect } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

const Bar = styled.nav`
    background-color: white;
    width: 100%;
    height: 50px;
`

const menu = (Logout) => {
    return (
        <Menu className="mt-3" style={{ width: "100px" }}>
            <Menu.Item onClick={Logout} key="0">
                <span>Logout</span>
            </Menu.Item>
            {/* <Menu.Item key="1">
                <a href="http://www.taobao.com/">2nd menu item</a>
            </Menu.Item> */}
        </Menu>
    )
}

class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            redirect : false,
        }
    }
    Logout = () => {
        localStorage.clear()
        this.setState({
            redirect: true,
        })
    }
    render() {
        if(this.state.redirect){
            return <Redirect push to="/login"/>
        }
        let user = jwtDecode(localStorage.getItem("JWT"))
        let page = this.props.page
        return (
            <Bar
                className="navbar navbar-light shadow-sm justify-content-between"
                {...this.props}
            >
                <Link to='/' className={`navbar-brand p-0 ${page === "" ? "d-none" : ""}`}>
                    <img src="/image/pic-regis 1.png" alt="News Management System" width="35px" height="35px" />
                    <span className="ml-2" style={{ fontSize: "20px" }}>News Management System</span>
                </Link>
                <div>
                </div>
                <div>
                    Hi' {user.fname}
                    <Dropdown className="mt-5" overlay={menu(this.Logout)} trigger={['click']}>
                        <Link className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            <img src="/image/user-profile.png" alt={user.fname+""+user.lname} className="ml-3" width="34px" height="34px" />
                        </Link>
                    </Dropdown>
                </div>
            </Bar>
        )
    }
}

export default Navbar