import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'
import Header from './Header';

export default class ChatContainer extends Component {
  state = { newMessage: '' }

  componentDidMount() {
    this.scrollToBottom()
  }

  componentDidUpdate(previousProps) {
    if (previousProps.messages.length !== this.props.messages.length) {
      this.scrollToBottom()
    }
  }

  scrollToBottom = () => {
    const messageContainer = ReactDOM.findDOMNode(this.messageContainer);
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }

  handleLogout = () => {
    firebase.auth().signOut();
  }

  handleInputChange = (e) => {
    this.setState({ newMessage: e.target.value });
  }

  handleSubmit = () => {
    this.props.onSubmit(this.state.newMessage);
    this.setState({ newMessage: '' });
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.handleSubmit();
    }
  }

  render() {
    return (
			<div id="ChatContainer" className="inner-container">
				<Header>
          <button className="red" onClick={this.handleLogout}>
            Logout
          </button>
        </Header>
				{
          this.props.messagesLoaded
            ? <div id="message-container" ref={(element => { this.messageContainer = element })}>
                {
                  this.props.messages.map((msg, i) => (
                    <div 
                      key={msg.id} 
                      className={`message ${this.props.user.email === msg.author && 'mine'}`}>
                        <p>{msg.msg}</p>
                        {
                          (!this.props.messages[i + 1] || this.props.messages[i + 1].author !== msg.author) 
                            && <p className="author"><Link to={`/users/${msg.user_id}`}>{msg.author}</Link></p>
                        }
                    </div>
                  ))
                }
              </div>
            : <div id="loading-container">
                <img src="/assets/icon.png" alt="logo" id="loader"/>
              </div>
        }
        <div id="chat-input">
          <textarea 
            placeholder="Add your message..."
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyDown}
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
