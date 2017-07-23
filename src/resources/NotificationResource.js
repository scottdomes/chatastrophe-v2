export default class NotificationResource {
  constructor(messaging, database) {
    this.messaging = messaging;
    this.database = database;
    this.messaging
      .requestPermission()
      .then(res => {
        console.log('Permission granted');
      })
      .catch(err => {
        console.log('no access', err);
      });
    this.database.ref('/fcmTokens').on('value', snapshot => {
      this.allTokens = snapshot.val();
      this.tokensLoaded = true;
    });
    this.setupTokenRefresh();
  }

  changeUser(user) {
    this.user = user;
    this.saveTokenToServer();
  }

  findExistingToken(tokenToSave) {
    for (let tokenKey in this.allTokens) {
      const token = this.allTokens[tokenKey].token;
      if (token === tokenToSave) {
        return tokenKey;
      }
    }
    return false;
  }

  setupTokenRefresh() {
    this.messaging.onTokenRefresh(() => {
      this.saveTokenToServer();
    });
  }

  saveTokenToServer() {
    this.messaging.getToken().then(res => {
      if (this.tokensLoaded) {
        const existingToken = this.findExistingToken(res);
        if (existingToken) {
          firebase.database().ref(`/fcmTokens/${existingToken}`).set({
            token: res,
            user_id: this.user.uid
          });
        } else {
          this.registerToken(res);
        }
      }
    });
  }

  registerToken(token) {
    firebase.database().ref('fcmTokens/').push({
      token: token,
      user_id: this.user.uid
    });
  }
}
