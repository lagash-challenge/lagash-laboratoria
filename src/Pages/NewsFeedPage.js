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
            user:"",
            posts: [],
            text: "",
            messagesUser: [] ,
            keyPhrases:{},
            score:{} ,
            postFinal:{}           
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
        

        //Post keyphrases
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
            .catch(error => console.log('parsing failed')) //END keyphrases

        //Post Score
         fetch("http://api-worldnews.azurewebsites.net/cognitive/sentiment", {
            method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ documents: [message] }),
            "content-type": 'application/json',
        })
            .then((response) => response.json())
            .then(parsedJSON => this.setState({ score: parsedJSON }))
            .then(()=>this.creatingfinalPost())
            .catch(error => console.log('parsing failed')) //END Score
       
            
    } //END handleclick 

    creatingfinalPost(){

        let index=this.state.messagesUser.length;
        console.log(this.state.keyPhrases.documents);
        
               

        const finalPost = {
            user: this.state.user,
            text: this.state.messagesUser[index-1].text,
            metaData: {
                keyPhrases: this.state.keyPhrases.documents[0].keyPhrases,
                sentiment: this.state.score.documents[0].score,
                photos: [],
                video: []
            }
        };
            
        this.setState({ postFinal: finalPost });

        
        
    } //END creatingfinalPost and POST FINALPOST


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
        console.log("keyphrasee", this.state.keyPhrases );
        console.log( "score",  this.state.score );
        console.log(this.state.postFinal);
        
        
        
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