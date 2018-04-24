import React, { Component } from 'react';
import { Row, Col, Media, Jumbotron } from 'reactstrap';
import TrendingTopics from './DetailTTPage';

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

        this.azureResponse = {};


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
        })
            .then((response) => response.json())
             .then(parsedJSON => this.azureResponse.keyPhrases = parsedJSON)
              //Post Score
            .then ( fetch("http://api-worldnews.azurewebsites.net/cognitive/sentiment", {
                    method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ documents: [message] }),
                })
                    .then((response) => response.json())
                    .then(parsedJSON => this.azureResponse.sentiment = parsedJSON)
                    .then(()=>this.creatingfinalPost())
                    .then(()=>this.sendFinalPost())
                    .catch(error => console.log('parsing failed', error))) 
                    //END Score
            .catch(error => console.log('parsing failed')) //END keyphrases
            
    } //END handleclick 

    creatingfinalPost(){

        console.log(this.azureResponse);
        console.log(this.azureResponse.keyPhrases);
        
        let index=this.state.messagesUser.length;
        var keyPhrases = [];
        var sentiment = [];     
        if (this.azureResponse.keyPhrases != undefined || this.azureResponse.keyPhrases.documents.length>0) {
            keyPhrases = this.azureResponse.keyPhrases.documents[0].keyPhrases;
        }
        if (this.azureResponse.sentiment != undefined || this.azureResponse.sentiment.documents.length>0) {
            sentiment = this.azureResponse.sentiment.documents[0].score;
        } //END if

        const finalPost = {
            user: this.state.user,
            text: this.state.messagesUser[index-1].text,
            metaData: {
                keyphrases: keyPhrases,
                sentiment: sentiment,
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
        })
            .then((response) => response.json())
            .then((parsedJSON) => this.setState({ posts: [...this.state.posts, parsedJSON]}))
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
        console.log(this.state.postFinal);
        
        return (
            <div>
              <Menu />
              <Jumbotron>
                <h1 className="display-3">Hello, world!</h1>
                <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
                <hr className="my-2" />
                <p>It uses utility classes for typgraphy and spacing to space content out within the larger container.</p>
                <p className="lead">
                </p>
              </Jumbotron>
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
                <Col md="6">
                  <TrendingTopics />
                </Col>
              </Row>
            </div>)
    }
} //END newsfeed

export default Newsfeed;