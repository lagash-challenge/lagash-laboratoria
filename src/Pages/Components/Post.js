import React, { Component } from 'react';
import { Card, CardTitle, CardText, Row, Col } from 'reactstrap';


class Post extends Component {
    constructor(props) {
        super(props);
        
    }    

    render() {
        let messages = this.props.messages;  
        
        if (messages===undefined){
            return(
                <div></div>
            )
        }else{
            return (
                <div>
                    <Row>
                     { messages.map(item=>{
                         return(
                          <Col key={item.id} sm="12">
                            <Card body>
                               <CardTitle>Tu dijiste</CardTitle>
                               <CardText>{item.text}</CardText>
                            </Card>
                         </Col>)
                     }) }
                    </Row>
                </div>
            )
        }// END if
   } //END render
} // END Post

export default Post;