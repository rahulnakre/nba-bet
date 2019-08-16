import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

var firebaseConfig = {
    apiKey: "AIzaSyC1SaC0hyHGKv3I0c5DL_AlrgZEXQLhrWw",
    authDomain: "sports-bet-eb9fa.firebaseapp.com",
    databaseURL: "https://sports-bet-eb9fa.firebaseio.com",
    projectId: "sports-bet-eb9fa",
    storageBucket: "sports-bet-eb9fa.appspot.com",
    messagingSenderId: "100274372518",
    appId: "1:100274372518:web:2bbe145365402992"
};
firebase.initializeApp(firebaseConfig);
//firebase.firestore().settings()

export default firebase