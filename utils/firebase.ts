'use client'
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCtKmSdqcPdUqv9ExZD9qWQmnweQ7cl7ss',
  authDomain: 'mvtt-30814.firebaseapp.com',
  projectId: 'mvtt-30814',
  storageBucket: 'mvtt-30814.appspot.com',
  messagingSenderId: '993632752729',
  appId: '1:993632752729:web:114e941cc68a975fd50d48',
  databaseURL: 'https://mvtt-30814.firebaseio.com',
  measurementId: 'G-R35HCKSDM6'
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)
export const analytics = getAnalytics(firebaseApp)
export const firestoreDb = getFirestore(firebaseApp)
