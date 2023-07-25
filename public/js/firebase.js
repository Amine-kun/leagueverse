
const firebaseConfig = {
  apiKey: "AIzaSyCWYl3gZhXwc9Dgfw-jQm2MTg77-zJDq7E",
  authDomain: "league-verse.firebaseapp.com",
  databaseURL: "https://league-verse-default-rtdb.firebaseio.com",
  projectId: "league-verse",
  storageBucket: "league-verse.appspot.com",
  messagingSenderId: "894553556038",
  appId: "1:894553556038:web:4faf1e5bed3ed9ecd97647"
};


firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
