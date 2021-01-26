import React from 'react'

//import BrowserRouter as Router when run reactjs
//import HashRouter as Router when run electron
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
// import Login from './screens/Login/Login';
import Login from './screens/Login/LoginNew'
import DashBoard from './DashBoard'

function AppRouter() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/DashBoard" component={DashBoard} />
            </Switch>
        </Router>
    )
}

export default AppRouter
