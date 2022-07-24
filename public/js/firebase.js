
  let firebaseConfig = {
    apiKey: YOUR_FIREBASE_APIKEY,
    authDomain: "league-verse.firebaseapp.com",
    projectId: "league-verse",
    storageBucket: "league-verse.appspot.com",
    messagingSenderId: "894553556038",
    appId: YOUR_APP_ID
  };


firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
