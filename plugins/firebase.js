import * as firebase from 'firebase';
import _ from 'lodash';
import Vue from 'vue/dist/vue';
import App from './components/app.vue';
import * as filters from './utils/filters'

console.log('initialize!')

if (process.BROWSER_BUILD) {
  console.log('initialize!')
  firebase.initializeApp({
    apiKey: "AIzaSyADqAVhWfQ2NlaZPf_xhp2cqm7T5iDkvCk",
    authDomain: "case-calendar-4b522.firebaseapp.com",
    databaseURL: "https://case-calendar-4b522.firebaseio.com",
    projectId: "case-calendar-4b522",
    storageBucket: "",
    messagingSenderId: "528259250615"
  });
}
