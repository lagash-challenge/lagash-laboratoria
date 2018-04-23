import React, { Component } from 'react';
import './App.css';

//Pages
import Newsfeed from './Pages/NewsFeedPage';

class App extends Component {
  constructor(props) {
    super(props);
   // this.handleClick = this.handleClick.bind(this);
    //this.handleChangeInput = this.handleChangeInput.bind(this);

    this.state = {
      user:"",
      messages: [],
      text: "",
      post:[]
    }

  }//END Constructor

    componentDidMount() {
      this.fetchData();
    } // END componentWillUnmount

    
fetchData(){
  fetch ('https://api-worldnews.azurewebsites.net/news', {
    method: "GET",
    headers: {
      Accept: 'application/json',
    }
  })
  .then ((response)=> response.json())
  .then (parsedJSON => console.log (parsedJSON))
  .catch(error => console.log('parsing failed'))
}// END fetchData

  handleSubmit(user){
    let message = { id: Date.now(), text: this.state.text };

    this.setState(
      {
        user: user,
        messages: this.state.messages.concat([message]),
        text: ""
      }
    );
  } //END handleSubmit

  handleChangeInput(value) {
    this.setState({ text: value })
  }



  render() {
    console.log(this.state.post);
    
    return (
      <div className="App">
        <Newsfeed 
        state = {this.state}
        handleSubmit = {this.handleSubmit}
        handleChangeInput = {this.handleChangeInput}
        />
      </div>
    );
  }
}

export default App;
