import React, { Component } from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';

export default class Menu extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          {/* <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar> */}
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">
                  <InputGroup>
                    <InputGroupAddon addonType="append"><i className="fas fa-search"></i></InputGroupAddon>                  
                    <Input placeholder="Buscar noticia"/>
                  </InputGroup>
                </NavLink>
              </NavItem>
              <img src="https://user-images.githubusercontent.com/32860789/39203275-eaa0b93e-47b9-11e8-9484-9ff8b466b4af.png" />  
              <NavItem>
                <NavLink href="/"><i className="far fa-question-circle"></i></NavLink>
              </NavItem>
            </Nav>
          {/* </Collapse> */}
        </Navbar>
      </div>
    );
  }
}