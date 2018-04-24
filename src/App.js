import React, { Component } from 'react';
import {Switch, Route, Router} from 'react-router';
import './App.css';

//Pages
import Newsfeed from './Pages/NewsFeedPage';
import Dashboard from'./Pages/DashboardPage';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
            <Route exact path="/" component={Newsfeed}/>
            <Route exact path="/dashboard" component={Dashboard}/>
        </ Router>
      </div>
    );
  }
}

export default App;
