import React, { Component } from 'react';
import { Row, Col, Jumbotron } from 'reactstrap';

//Components
import TrendingTopics from './DetailTTPage';
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
              
              <Jumbotron>
                <img src="https://user-images.githubusercontent.com/32860789/39320617-3fec8f3a-494a-11e8-9a44-689fe1450e41.png" width="40%"/>
              </Jumbotron>
              <Row>
                <Col md="6" xs="12">
                <p>¿Qué quieres compartir hoy?</p>
                <InputPost
                    handleClick={this.handleClick}
                    handleChangeInput={this.handleChangeInput}
                    handleChangeName={this.handleChangeName}
                    text={this.state.text}
                    name={this.state.user}
                />
                <img src="https://user-images.githubusercontent.com/32860789/39204328-191e6010-47bd-11e8-8af6-6ea19a4aa073.png" width="90%"/>                
                <Post
                    messages={this.state.posts}
                  />
                </Col>

                <Col md={{size: 5, order: 2, offset: 1}} xs="12">
                  <img src="https://user-images.githubusercontent.com/32860789/39207866-bd781558-47c6-11e8-86e5-756667353123.png" width="90%"/>                
                  <img src="https://user-images.githubusercontent.com/32860789/39206719-c6c94184-47c3-11e8-829b-1e0556072ede.png" width="90%"/>                
                  <TrendingTopics />
                </Col>
              </Row>
            </div>)
    }
} //END newsfeed

export default Newsfeed;