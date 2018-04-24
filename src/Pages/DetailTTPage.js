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

  addMonster(){
    this.state.posts.map(item => {
      

    })
  }
  render() {
        
    return (
      <ListGroup> .
          {  this.state.posts.map(item=>{
          var monster = null;
          if (item.metaData.sentiment > .7) {
            monster = <img width="30px" src="https://user-images.githubusercontent.com/32860406/39215651-3f2c7564-47de-11e8-89ce-3ba1a3861097.png" />
          } else if (item.metaData.sentiment > .3 < .7) {
            monster = <img width="30px" src="https://user-images.githubusercontent.com/32860406/39215648-3d4df678-47de-11e8-94df-4098cad2add3.png" />
          } else {
            monster = <img width="30px" src="https://user-images.githubusercontent.com/32860406/39215656-45d2047e-47de-11e8-9a31-5a7243eac652.png" />
          }
              return (
                <ListGroupItem>
                  {monster}
                  #{item.metaData.keyphrases[0]}</ListGroupItem>
                )
            }) } 
      </ListGroup>
    );
  }
}