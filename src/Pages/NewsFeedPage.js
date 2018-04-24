import React, { Component } from 'react';

//Components
import Menu from './Components/Navbar';
import InputPost from './Components/InputPost';
import Post from './Components/Post';

class Newsfeed extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);

        this.state = {
            posts: [],
            text: "",
            messagesUser: [] ,
            keyPhrases:{}
            
        }

    }//END Constructor

    handleClick() {
        let message = {  language:"es",
                         id: Date.now(),
                         text: this.state.text };

        this.setState(
                { messagesUser : this.state.messagesUser.concat([message]),
                  text: "" }
                );//END submit and clear input
        

            
            fetch("http://api-worldnews.azurewebsites.net/cognitive/keyphrases", {
            method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ documents: [message] }),
            "content-type": 'application/json',
        })
            .then((response) => response.json())
            .then(parsedJSON => this.setState({ keyPhrases: parsedJSON }))
            .catch(error => console.log('parsing failed'))
            
    } 

    handleChangeInput(value) {
        this.setState({ text: value })
    }
    componentWillMount() {
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
            .then(parsedJSON => this.setState({ posts: parsedJSON }))
            .catch(error => console.log('parsing failed'))
    }// END fetchData

    render() {
        console.log({ documents: this.state.keyPhrases } );
        
        return (
            <div>
              <Menu />
               <InputPost
                    handleClick={this.handleClick}
                    handleChangeInput={this.handleChangeInput}
                    text={this.state.text}
                />
                <Post
                    messages={this.state.posts}
                />
            </div>)
    }
} //END newsfeed

export default Newsfeed;