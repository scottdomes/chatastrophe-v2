import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import AsyncComponent from './AsyncComponent';
import NotificationResource from '../resources/NotificationResource';
import './app.css';

const loadLogin = () => {
  return import('./LoginContainer').then(module => module.default);
};

const loadChat = () => {
  return import('./ChatContainer').then(module => module.default);
};

const loadUser = () => {
  return import('./UserContainer').then(module => module.default);
};

const LoginContainer = AsyncComponent(loadLogin);

const UserContainer = AsyncComponent(loadUser);

const ChatContainer = AsyncComponent(loadChat);

class App extends Component {
  state = { user: null, messages: [], messagesLoaded: false };
  componentDidMount() {
    this.notifications = new NotificationResource(
      firebase.messaging(),
      firebase.database()
    );
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
        this.notifications.changeUser(user);
      } else {
        this.props.history.push('/login');
      }
    });
    firebase.database().ref('/messages').on('value', snapshot => {
      this.onMessage(snapshot);
      if (!this.state.messagesLoaded) {
        this.setState({ messagesLoaded: true });
      }
    });
    this.listenForInstallBanner();
    loadLogin();
    loadUser();
    loadChat();
  }

  listenForInstallBanner = () => {
    window.addEventListener('beforeinstallprompt', e => {
      console.log('beforeinstallprompt Event fired');
      e.preventDefault();

      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;

      return false;
    });
  };

  onMessage = snapshot => {
    const messages = Object.keys(snapshot.val()).map(key => {
      const msg = snapshot.val()[key];
      msg.id = key;
      return msg;
    });
    this.setState({ messages });
  };

  handleSubmitMessage = msg => {
    const data = {
      msg: msg,
      author: this.state.user.email,
      user_id: this.state.user.uid,
      timestamp: Date.now()
    };
    firebase.database().ref('messages/').push(data);
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then(choice => {
        console.log(choice);
      });
      this.deferredPrompt = null;
    }
  };

  render() {
    return (
      <div id="container">
        <Route path="/login" component={LoginContainer} />
        <Route
          exact
          path="/"
          render={() =>
            <ChatContainer
              messagesLoaded={this.state.messagesLoaded}
              onSubmit={this.handleSubmitMessage}
              messages={this.state.messages}
              user={this.state.user}
            />}
        />
        <Route
          path="/users/:id"
          render={({ history, match }) =>
            <UserContainer
              messages={this.state.messages}
              messagesLoaded={this.state.messagesLoaded}
              userID={match.params.id}
            />}
        />
      </div>
    );
  }
}

export default withRouter(App);


navigator.serviceWorker.ready.then(function(registration) {
  if (!registration.pushManager) {
    alert('No push notifications support.');
    return false;
  }

  //To subscribe `push notification` from push manager
  registration.pushManager.subscribe({
    userVisibleOnly: true //Always show notification when received
  })
  .then(function (subscription) {
    console.log('Subscribed.');
  })
  .catch(function (error) {
    console.log('Subscription error: ', error);
  });
})