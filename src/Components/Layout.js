import React from 'react'
import Navbar from './Navbar'

import { Layout, Menu } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

class SiderDemo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
            page: "",
            pageType: "",
            system: "",
            systemid: 0,
            data: "wait",
            redirect: false,
            path: "",
        };
    }

    setData = async () => {
        console.log("data", this.props.data)
        let data = this.props.data
        this.setState({
            page: data.page,
            pageType: data.pageType,
            system: data.system,
            systemid: data.systemid,
        })
    }

    async componentWillMount() {
        await this.setData()
    }

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider style={{ color: "white" }} width="250" collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <Menu theme="dark" defaultOpenKeys={[this.state.pageType]} defaultSelectedKeys={[this.state.page]} mode="inline">
                        <Menu.Item
                            onClick={() => this.props.history.push(`/`)}
                            key="0"
                            className="pl-4 pt-2" style={{ height: "60px" }}
                            icon={<img alt="News Management System" className="mr-2" src="/image/pic news.png" width="35px" height="35px" />}
                        >
                            <span className={`${this.state.collapsed ? "d-none" : ""}`}>
                                News Management System
                            </span>
                        </Menu.Item>
                        <Menu.Item onClick={() => this.props.history.push(`/${this.state.system}/${this.state.systemid}/home`)} key="home" icon={<PieChartOutlined />} >
                            {this.state.system}
                        </Menu.Item>
                        <SubMenu key="news" icon={<UserOutlined />} title="News">
                            <Menu.Item onClick={() => this.props.history.push(`/${this.state.system}/${this.state.systemid}/news/allnews`)} key="allnews">
                                All news
                            </Menu.Item>
                            <Menu.Item onClick={() => this.props.history.push(`/${this.state.system}/${this.state.systemid}/news/createnews`)} key="createnews">
                                Create news
                                    </Menu.Item>
                            <Menu.Item onClick={() => this.props.history.push(`/${this.state.system}/${this.state.systemid}/news/createnewstype`)} key="createnewstype">
                                Create news type
                                    </Menu.Item>
                        </SubMenu>
                        <SubMenu key="targetgroup" icon={<TeamOutlined />} title="Team">
                            <Menu.Item onClick={() => this.props.history.push(`/${this.state.system}/${this.state.systemid}/targetgroup/alltargetgroup`)} key="alltargetgroup">
                                All target group
                                    </Menu.Item>
                            <Menu.Item onClick={() => this.props.history.push(`/${this.state.system}/${this.state.systemid}/targetgroup/createtargetgroup`)} key="createtargetgroup">
                                Create target group
                                    </Menu.Item>
                        </SubMenu>
                        <Menu.Item onClick={() => this.props.history.push(`/${this.state.system}/${this.state.systemid}/dashboard`)} key="dashboard" icon={<DesktopOutlined />}>
                            Dashboard
                                </Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{backgroundColor:"white"}} className="site-layout">
                    <Navbar page="" />
                    <Content style={{ margin: '0 16px' }}>
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default SiderDemo