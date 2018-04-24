import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

//Components
import Menu from './Components/Navbar';
import InputPost from './Components/InputPost';
import Post from './Components/Post';
import './NewsFeedPage.css';

class Newsfeed extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        

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

    componentWillMount() {
        this.fetchData();

    } // END componentWillUnmount

    handleClick() {
        let message = {  language:"es",
                         id: Date.now(),
                         text: this.state.text };

        let name=this.state.user

        this.setState(
                { messagesUser : this.state.messagesUser.concat([message]),
                  text: "" ,
                  user: name}
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
              //Post Score
            .then ( fetch("http://api-worldnews.azurewebsites.net/cognitive/sentiment", {
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
                    .then(()=>this.sendFinalPost())
                    .catch(error => console.log('parsing failed', error))) 
                    //END Score
            .catch(error => console.log('parsing failed')) //END keyphrases
            
    } //END handleclick 

    creatingfinalPost(){

        let index=this.state.messagesUser.length;     

        const finalPost = {
            user: this.state.user,
            text: this.state.messagesUser[index-1].text,
            metaData: {
                keyphrases: this.state.keyPhrases.documents[0].keyPhrases,
                sentiment: this.state.score.documents[0].score,
                photos: [],
                videos: []
            }
        };
            
        this.setState({ postFinal: finalPost });
        
    } //END creatingfinalPost and POST FINALPOST

    sendFinalPost(){
        fetch("https://api-worldnews.azurewebsites.net/news", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.postFinal),
            "content-type": 'application/json',
        })
            .then((response) => response.json())
            .then(parsedJSON => this.setState({ posts: [...this.state.posts, parsedJSON]}))
            .catch(error => console.log('parsing failed', error))

    } //END sendFinalPost


    handleChangeInput(value) {
        this.setState({ text: value })
    } 
    handleChangeName(val) {
        this.setState({ user: val })
    }
    
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
        console.log(this.state);
        
        return (
            <div>
              <Menu />
              <Row>
                <Col md="6">
                <p>¿Qué quieres compartir hoy?</p>
               <InputPost
                    handleClick={this.handleClick}
                    handleChangeInput={this.handleChangeInput}
                    handleChangeName={this.handleChangeName}
                    text={this.state.text}
                    name={this.state.user}
                />
                <Post
                    messages={this.state.posts}
                  />
                </Col>
              </Row>
            </div>)
    }
} //END newsfeed

export default Newsfeed;