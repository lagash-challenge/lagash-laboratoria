import React, { Component } from 'react';

//Elements
import InputPost from './Components/InputPost';
import Post from './Components/Post';



class Newsfeed extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);

        this.state = {
            messages: [],
            text: ""
        }

    }//END Constructor

    handleClick() {
        let message = { id: Date.now(), text: this.state.text };

        this.setState(
            {
                messages: this.state.messages.concat([message]),
                text: ""
            }
        );
    } //EDN submit and clear input

    handleChangeInput(value) {
        this.setState({ text: value })
    }

    render() {
        return (
            <div>
                <InputPost
                    handleClick={this.handleClick}
                    handleChangeInput={this.handleChangeInput}
                    text={this.state.text}
                />
                <Post
                    messages={this.state.messages}
                />
            </div>)
    }
} //END newsfeed

export default Newsfeed;