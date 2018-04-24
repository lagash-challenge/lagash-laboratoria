import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class ContentTT extends React.Component {
  constructor(props) {
    super(props)
  }


  
  render() {
    console.log(this.props.posts, "tt");
    return (
      <ListGroup>
        <ListGroupItem>Cras justo odio</ListGroupItem>
        <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
        <ListGroupItem>Morbi leo risus</ListGroupItem>
        <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
        <ListGroupItem>Vestibulum at eros</ListGroupItem>
      </ListGroup>
    );
  }
} //END TT