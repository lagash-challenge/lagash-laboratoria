import React, { Component } from 'react';
import {Switch, Link, Route, Router} from 'react-router';
import './Pages/NewsFeedPage';

export default class Router extends Component {
    constructor(props) {
        super(props);
        

    }//END Constructor

    

    render() {
        return (
        <Switch>
            <Route exact path="/" component={Newsfeed}/>
          </Switch>
    );
    }
} //END newsfeed