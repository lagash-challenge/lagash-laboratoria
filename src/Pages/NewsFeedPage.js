import React, { Component } from 'react';

//Components
import InputPost from "./Components/InputPost";
import Menu from './Components/Navbar';



export default class Newsfeed extends Component {
   

    

    render() {

        return (
            <div>
              <Menu />
              Página de newsfeed WIP
              <InputPost 
              state={this.props.state}
              handleSubmit = {this.props.handleSubmit}
              handleChangeInput = {this.props.handleChangeInput}
              />
            </div>)
    }
} //END newsfeed
