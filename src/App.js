import React, { Component } from 'react';
import './App.css';

//Components
import NewsfeedPage from './Pages/NewsFeedPage';


class App extends Component {
    
    constructor(props) {
        super(props);


    }//END Constructor

    componentDidMount() {
        this.fetchData();
    } // END componentWillUnmount


    fetchData() {
        fetch('https://api-worldnews.azurewebsites.net/news', {
            method: "GET",
            headers: {
                Accept: 'application/json',
            }
        })
            .then((response) => response.json())
            .then(parsedJSON => console.log(parsedJSON))
            .catch(error => console.log('parsing failed'))
    }// END fetchData
    render() {
        return (
            <div className="App">
                <NewsfeedPage />
            </div>
        );
    }
}

export default App;