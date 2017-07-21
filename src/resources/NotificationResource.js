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
      console.log(snapshot.val());
      this.allTokens = snapshot.val();
      this.tokensLoaded = true;
    });
    this.setupTokenRefresh();
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
          // Replace existing toke
        } else {
          // Create a new one
        }
      }
    });
  }
}
