import React, { Component } from 'react';
import {Switch, Link, Route, Router} from 'react-router';
import NewsFeedPage from './Pages/NewsFeedPage';
import DashboardPage from'./Pages/DashboardPage';

export default class Router extends Component {

    render() {
        return (
        <Router>
          <Switch>
            <Route exact path="/" component={NewsFeedPage}/>
            <Route exact path="/Dashboard" component={DashboardPage}/>
          </Switch>
        </ Router>
    );
    }
}