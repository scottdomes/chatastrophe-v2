import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

export default class UserContainer extends Component {
  render() {
    let renderedUserEmail = false
    return (
      <div id="UserContainer" className="inner-container">
        <Header>
          <Link to="/">
            <button className="red light">
              Back To Chat
            </button>
          </Link>
        </Header>
        {
          this.props.messagesLoaded
            ? <div id="message-container">
                {
                  this.props.messages.map(msg => {
                    if (msg.user_id === this.props.userID) {
                      const element =  (
                        <div key={msg.id} className="message">
                          {
                            !renderedUserEmail &&
                              <p className="author">{msg.author}</p>
                          }
                          <p>{msg.msg}</p>
                        </div>
                      );
                      renderedUserEmail = true;
                      return element;
                    }
                  })
                }
              </div>
            : <div id="loading-container">
                <img src="/assets/icon.png" alt="logo" id="loader"/>
              </div>
        }
      </div>
    );
  }
}
