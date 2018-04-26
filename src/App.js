import React, { Component } from 'react';
import {Switch, Route} from 'react-router';
import './App.css';


//Pages
import Menu from './Pages/Components/Navbar';
import Newsfeed from './Pages/NewsFeedPage';
import Dashboard from'./Pages/DashboardPage';
import Tabs from './Pages/Components/Tabs';

class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (      
      <div className="App">
        <Menu />
        <Tabs>
        </ Tabs>
        <Switch>
            <Route exact path="/" component={Newsfeed}/>
            <Route exact path="/dashboard" component={Dashboard}/>
        </ Switch>
      </div>
    );
  }
}

export default App;
