import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = 
{
    apiKey: "AIzaSyCKM79ZRZafTCWvgwnt-BXSSlOPlMts91I",
    authDomain: "football-matches-d9423.firebaseapp.com",
    databaseURL: "https://football-matches-d9423.firebaseio.com",
    projectId: "football-matches-d9423",
    storageBucket: "football-matches-d9423.appspot.com",
    messagingSenderId: "780624678460",
    appId: "1:780624678460:web:ee83ae2ed6820299ddbd39",
    measurementId: "G-1P5889V163"
};

firebase.initializeApp(firebaseConfig);

const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref('matches');
const firebasePromotions = firebaseDB.ref('promotions');
const firebaseTeams = firebaseDB.ref('teams');
const firebasePlayers = firebaseDB.ref('players');

// firebaseDB.ref('matches').once('value')
// .then(response =>
// {
//     console.log("firebase.js response",response);
// })
// .catch(error =>
// {
//     console.log("firebase.js error",error);
// })


export {
    firebase,
    firebaseMatches,
    firebasePromotions,
    firebaseTeams,
    firebasePlayers,
    firebaseDB
}