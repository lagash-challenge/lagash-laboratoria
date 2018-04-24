import React, { Component } from 'react';
import './App.css';

//Components
import NewsfeedPage from './Pages/NewsFeedPage';


class App extends Component {
   

    render() {
        return (
            <div className="App">
                <NewsfeedPage />
            </div>
        );
    }
}

export default App;