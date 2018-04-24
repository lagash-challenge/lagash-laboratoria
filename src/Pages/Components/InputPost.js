import React, { Component } from 'react';
import { Button, Form, Input } from 'reactstrap';

//Elements


class InputPost extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    

  }//END Constructor

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleClick()

  } //EDN submit

  handleChange(event) {
    let msn = event.target.value;
    this.props.handleChangeInput(msn)
  }

  handleChangeName(event) {
    let user = event.target.value;
    this.props.handleChangeName(user)
  }

  render() {    
    return (
      <Form onSubmit={this.handleSubmit}>
        <Input placeholder="Escribe tu nombre"  onChange={this.handleChangeName} type="text"  />
        <Input placeholder="Comparte tu opinión" value={this.props.text} onChange={this.handleChange} type="textarea" name="text" id="message" />
        <Button type="submit" className="prueba">Publicar</Button>
      </Form>);
  }
} //END InputPost

export default InputPost;