import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

export default class UserContainer extends Component {
  render() {
    console.log(this.props)
    return (
      <div id="UserContainer">
        <Header>
          <Link to="/">
            <button className="red light">
              Back To Chat
            </button>
          </Link>
        </Header>
        <h1>Hello from UserContainer for User {this.props.match.params.id}</h1>
      </div>
    );
  }
}
