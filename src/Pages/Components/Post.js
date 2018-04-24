import React, { Component } from 'react';
import { Card, CardTitle, CardText, Row, Col } from 'reactstrap';


class Post extends Component {   

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
                     { messages.sort().map((item, index)=>{
                         return(
                          <Col key={item.id||index} sm="12">
                            <Card body>
                               <CardTitle>{item.user}</CardTitle>
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