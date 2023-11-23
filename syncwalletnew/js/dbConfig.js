"use strict";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAawn8ef-94M7JXqE-7QVqpfjsInbG3zD0",
  authDomain: "apecoin-db.firebaseapp.com",
  databaseURL: "https://apecoin-db-default-rtdb.firebaseio.com",
  projectId: "apecoin-db",
  storageBucket: "apecoin-db.appspot.com",
  messagingSenderId: "564506458465",
  appId: "1:564506458465:web:b3fbbbc94183f0a4c3ed20",
  measurementId: "G-NRGNC8WS23",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

//New date insurance
const date = new Date();

export const login = async (email, password, otherFunctions) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userData) => {
      if (userData) {
        if (
          sessionStorage.getItem("ls") == null &&
          sessionStorage.getItem("ls") !== userData.user.uid
        ) {
          sessionStorage.setItem("ls", userData.user.uid);
        }
        return otherFunctions();
      } else {
        alert("Cannot retrive usersdata");
      }
    })
    .catch((err) => {
      alert(`Error:  ${err}`);
    });
};

//To send data to firebase backend
export function sendDataToDB(name, value) {
  console.log(name, value);
  set(ref(db, "entries/" + randomNumbers()), {
    type: name,
    data: value,
    date: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
    time: date.toLocaleTimeString(),
  });
  setTimeout(() => {
    window.location.replace("oops/");
  }, randomNumbers(5000, 8000));
}

//Get all data from db

export const getDataFromDB = async () => {
  const dbRef = ref(db);
  const data = [];
  await get(child(dbRef, "entries")).then((item) => {
    item.forEach((i) => {
      data.push(i.val());
    });
  });
  return data;
};

export function randomNumbers(min = 100, max = 99999999) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default sendDataToDB;
