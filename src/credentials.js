// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7O9_aZZh2GYbOKKOhk7cHufCwk8PiYXc",
  authDomain: "fir-9-js-crud-ece5f.firebaseapp.com",
  projectId: "fir-9-js-crud-ece5f",
  storageBucket: "fir-9-js-crud-ece5f.appspot.com",
  messagingSenderId: "801652418348",
  appId: "1:801652418348:web:fd264972bf553fff9c2e89"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;