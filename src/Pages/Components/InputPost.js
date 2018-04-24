import React, { Component } from 'react';
import { Button, Form, Input } from 'reactstrap';

//Elements


class InputPost extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }//END Constructor

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleClick()

  } //EDN submit

  handleChange(event) {
    let msn = event.target.value;
    this.props.handleChangeInput(msn)
  }

  render() {

    return (
      <Form onSubmit={this.handleSubmit} lg="6">
        <Input placeholder="Comparte tu opinión" value={this.props.text} onChange={this.handleChange} type="textarea" name="text" id="message" />
        <Button type="submit" className="prueba">Publicar</Button>
      </Form>);
  }
} //END InputPost

export default InputPost;