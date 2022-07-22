
  let key =  process.env.FIREBASE_APIKEY;
  let id = process.env.APP_ID;

  let firebaseConfig = {
    apiKey: key,
    authDomain: "league-verse.firebaseapp.com",
    projectId: "league-verse",
    storageBucket: "league-verse.appspot.com",
    messagingSenderId: "894553556038",
    appId: id
  };


firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();