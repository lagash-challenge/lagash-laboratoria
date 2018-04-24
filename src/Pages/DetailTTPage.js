import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class TrendingTopics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }

    this.azureResponse = {};


  }//END Constructor
  
  componentDidMount() {
    this.fetchData();

  } // END componentWillUnmount
  fetchData() {
    this.prueba=null;
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
    
    return (
      <ListGroup> .
          {  this.state.posts.map(item=>{
              return (
                <ListGroupItem>{item.metaData.keyphrases[0]}</ListGroupItem>
                )
            }) } 
      </ListGroup>
    );
  }
}