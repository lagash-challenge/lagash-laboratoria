import React, { Component } from 'react';
import { Card, CardTitle, CardText, Row, Col } from 'reactstrap';


class Post extends Component {   

    render() {
        let messages = this.props.messages;  
        
        if (!messages){
            return(
                <div></div>
            )
        }else{
            messages.sort(function(a, b){
                var dateA = new Date(a.date);
                var dateB = new Date(b.date);

                if (dateA.getTime() < dateB.getTime())
                    return 1;

                else if (dateA.getTime() > dateB.getTime())
                    return -1;

                return 0;
            });
            return (
                <div>
                    <Row>
                     { messages.map((item, index)=>{
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