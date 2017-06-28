import React, { Component } from 'react';
import Header from './Header';

export default class ChatContainer extends Component {
  state = { newMessage: '' }

  handleLogout = () => {
    firebase.auth().signOut()
  }

  handleInputChange = (e) => {
    this.setState({ newMessage: e.target.value })
  }

  handleSubmit = () => {
    this.props.onSubmit(this.state.newMessage)
  }

  render() {
    return (
			<div id="ChatContainer">
				<Header>
          <button className="red" onClick={this.handleLogout}>
            Logout
          </button>
        </Header>
				<div id="message-container">

        </div>
        <div id="chat-input">
          <textarea 
            placeholder="Add your message..."
            onChange={this.handleInputChange}
            value={this.state.newMessage} />
          <button onClick={this.handleSubmit}>
            <svg viewBox="0 0 24 24">
                <path fill="#424242" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
            </svg>
          </button>
        </div>
			</div>
    );
  }
}
