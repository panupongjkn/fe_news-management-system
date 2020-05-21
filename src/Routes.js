import React from 'react'
import 'antd/dist/antd.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import Layout from './Components/Layout';

//Pages
import LoginPage from './Pages/Login'
import RegisterPage from './Pages/Register'
import SystemsPage from './Pages/Systems'
import CreateSystemPage from './Pages/CreateSystem'
import HomeSystemPage from './Pages/HomeSystem'
import AllNewsPage from './Pages/AllNews'
import CreateNewsPage from './Pages/CreateNews'
import CreateNewsTypePage from './Pages/CreateNewsType'
import NewsPage from './Pages/News';
import CreateTargetGroupPage from './Pages/CreateTargetGroup'
import DashboardPage from './Pages/Dashboard'
import AllTargetGroupPage from './Pages/AllTargetGroup';
import RoleUserPage from './Pages/RoleUser'
import AnnounceNewsPage from './Pages/AnnounceNews'
//Line
import LineRoutes from './Pages/Line/Routes'
import RegisterLine from './Pages/Line/Register'
//Loading
import Loading from './Components/Loading'
class Routes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
        }
    }
    onLoading = (status) => {
        this.setState({loading: status})
    }
    render() {
        return (
            <Router>
                <Loading display={this.state.loading}/>
                <Switch>
                    <Route path="/line/:system/:systemid/register" render={(props) => <RegisterLine onLoading={this.onLoading} {...props} />} />
                    <Route path="/line/news/:newsid" render={(props) => <NewsPage onLoading={this.onLoading} {...props} />} />
                    <Route path="/login" render={(props) => <LoginPage onLoading={this.onLoading} {...props} />} />
                    <Route path="/register" render={(props) => <RegisterPage onLoading={this.onLoading} {...props} />} />
                    <Route path="/systems" render={(props) => <SystemsPage onLoading={this.onLoading} {...props} />} />
                    <Route path="/system/create" render={(props) => <CreateSystemPage onLoading={this.onLoading} {...props} />} />
                    <Route path="/:system/:systemid/home" render={(props) => <HomeSystemPage  onLoading={this.onLoading} {...props} />} />
                    <Route path="/:system/:systemid/news/:newsid/announce" render={(props) => <AnnounceNewsPage onLoading={this.onLoading} {...props} />} />
                    <Route path="/:system/:systemid/news/:newsname/:newsid" render={(props) => <NewsPage onLoading={this.onLoading} {...props} />} />
                    <Route path="/:system/:systemid/news/allnews" render={(props) => <AllNewsPage onLoading={this.onLoading} {...props} />} />
                    <Route path="/:system/:systemid/news/createnews" render={(props) => <CreateNewsPage onLoading={this.onLoading} {...props} />} />
                    <Route path="/:system/:systemid/news/createnewstype" render={(props) => <CreateNewsTypePage onLoading={this.onLoading} {...props} />} />
                    <Route path="/:system/:systemid/targetgroup/alltargetgroup" render={(props) => <AllTargetGroupPage onLoading={this.onLoading} {...props} />} />
                    <Route path="/:system/:systemid/targetgroup/createtargetgroup" render={(props) => <CreateTargetGroupPage onLoading={this.onLoading} {...props} />} />
                    <Route path="/:system/:systemid/dashboard" render={(props) => <DashboardPage {...props} />} />
                    <Route path="/:system/:systemid/role" render={(props) => <RoleUserPage onLoading={this.onLoading} {...props} />} />
                    <Route path="/" render={(props) => <LineRoutes onLoading={this.onLoading} {...props} />} />
                </Switch>
            </Router>
        )
    }
}

export default Routes