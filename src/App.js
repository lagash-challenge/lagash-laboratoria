import React, { Component } from 'react';
import {Switch, Route} from 'react-router';
import './App.css';

//Pages
import Newsfeed from './Pages/NewsFeedPage';
import Dashboard from'./Pages/DashboardPage';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Switch>
            <Route exact path="/" component={Newsfeed}/>
            <Route exact path="/dashboard" component={Dashboard}/>
      </ Switch>
      </div>
    );
  }
}

export default App;
