import * as firebase from 'firebase';
// class Firebase{
//   static init(){
//     firebase.initializeApp({
//       apiKey: "AIzaSyC1jfN7z57RSZzBvxogDGrj4jp9ECYOceo",
//       authDomain: "appdemo2-71552.firebaseapp.com",
//       databaseURL: "https://appdemo2-71552.firebaseio.com",
//       storageBucket: "appdemo2-71552.appspot.com"
//     });
//   }
// }
const firebaseConfig = {
  apiKey: "AIzaSyANVVk-nbUYdj6XwIiiuTcfkJGYaKRztJ8",
  authDomain: "blog-89006.firebaseapp.com",
  databaseURL: "https://blog-89006.firebaseio.com",
  projectId: "blog-89006",
  storageBucket: "blog-89006.appspot.com",
  messagingSenderId: "588885665666"
};
const Firebase = firebase.initializeApp(firebaseConfig);
module.exports = Firebase;
