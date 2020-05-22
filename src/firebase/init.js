import firebase from 'firebase'
import firestore from 'firebase/firestore'
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDFVS7che7v-X-hlTSK0PRwG_kJhYK8_Mk",
  authDomain: "shopitems-bd224.firebaseapp.com",
  databaseURL: "https://shopitems-bd224.firebaseio.com",
  projectId: "shopitems-bd224",
  storageBucket: "shopitems-bd224.appspot.com",
  messagingSenderId: "108189156033",
  appId: "1:108189156033:web:c8fa372fae3b414c5a0a40"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
// firebaseApp.firestore().settings({
//   timestampsInSnapshots: true
// })

//export firestore database
export default firebaseApp;
