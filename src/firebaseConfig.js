import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClB6TCQ2ZvVYHSdh0B6rWHArD3WQXJORY",
  authDomain: "pallet-dfcd8.firebaseapp.com",
  databaseURL: "https://pallet-dfcd8-default-rtdb.firebaseio.com",
  projectId: "pallet-dfcd8",
  storageBucket: "pallet-dfcd8.appspot.com",
  messagingSenderId: "58140037966",
  appId: "1:58140037966:web:c52730e2bd70a70e00c41f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);

export default database;
