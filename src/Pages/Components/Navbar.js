import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
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
          <NavbarBrand href="/Newsfeed">Logo de la red social</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/"><i className="fas fa-user"></i></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/"><i className="fas fa-envelope"></i></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/"><i className="far fa-bell"></i></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">
                  <InputGroup>
                    <Input placeholder="Buscar noticia"/>
                    <InputGroupAddon addonType="append"><i className="fas fa-search"></i></InputGroupAddon>
                  </InputGroup>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/"><i className="far fa-question-circle"></i></NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}