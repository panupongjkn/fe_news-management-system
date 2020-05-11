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
import AlTargetGroupPage from './Pages/AllTargetGroup'
import CreateTargetGroupPage from './Pages/CreateTargetGroup'
import DashboardPage from './Pages/Dashboard'
import AllTargetGroupPage from './Pages/AllTargetGroup';
export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/login" render={(props) => <LoginPage {...props}/>} />
                <Route path="/register" render={(props) => <RegisterPage {...props}/>} />
                <Route path="/systems" render={(props) => <SystemsPage {...props}/>} />
                <Route path="/system/create" render={(props) => <CreateSystemPage {...props}/>} />
                <Route path="/:system/:systemid/home" render={(props) => <HomeSystemPage {...props}/>} />
                <Route path="/:system/:systemid/news/allnews" render={(props) => <AllNewsPage {...props}/>} />
                <Route path="/:system/:systemid/news/createnews" render={(props) => <CreateNewsPage {...props}/>} />
                <Route path="/:system/:systemid/news/createnewstype" render={(props) => <CreateNewsTypePage {...props}/>} />
                <Route path="/:system/:systemid/targetgroup/alltargetgroup" render={(props) => <AllTargetGroupPage {...props}/>} />
                <Route path="/:system/:systemid/targetgroup/createtargetgroup" render={(props) => <CreateTargetGroupPage {...props}/>} />
                <Route path="/:system/:systemid/dashboard" render={(props) => <DashboardPage {...props}/>} />
                <Route path="/test" render={(props) => <Layout {...props}/>} />
                <Route render={() => <Redirect push to="/login" />} />
            </Switch>
        </Router>
    )
}