import * as firebase from 'firebase'

if (process.BROWSER_BUILD) {
  firebase.initializeApp({
    apiKey: 'AIzaSyADqAVhWfQ2NlaZPf_xhp2cqm7T5iDkvCk',
    authDomain: 'case-calendar-4b522.firebaseapp.com',
    databaseURL: 'https://case-calendar-4b522.firebaseio.com',
    projectId: 'case-calendar-4b522',
    storageBucket: '',
    messagingSenderId: '528259250615'
  })
}
