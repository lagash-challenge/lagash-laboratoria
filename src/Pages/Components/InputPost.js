import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Input } from 'reactstrap';

export default class InputPost extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);

    }//END Constructor

    handleChange(event) {
        let msn = event.target.value;
        this.props.handleChangeInput(msn)
    }

   


  render() {
    console.log(this.props.state);
    
    return (
      <Form>
        <FormGroup row>
          <Col sm={10}>
            <Input type="text" name="user" id="User" placeholder="Nombre" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={10}>
            <Input type="textarea" name="text" id="Post" placeholder="¿Qué estas pensando?" 
             value={this.props.text}
             onChange={this.handleChange}/>
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button>Publicar</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
} //END InputPost