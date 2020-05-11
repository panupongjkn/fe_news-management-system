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
export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/login" render={(props) => <LoginPage {...props}/>} />
                <Route path="/register" render={(props) => <RegisterPage {...props}/>} />
                <Route path="/systems" render={(props) => <SystemsPage {...props}/>} />
                <Route path="/system/create" render={(props) => <CreateSystemPage {...props}/>} />
                <Route path="/:system/:systemid/home" render={(props) => <HomeSystemPage {...props}/>} />
                <Route render={() => <Redirect push to="/login" />} />
            </Switch>
        </Router>
    )
}