import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyAd_6xgsYN_4WEeZe-gJo0mcWx35C0wYW4",
  authDomain: "quiz-e33a9.firebaseapp.com",
  projectId: "quiz-e33a9",
  storageBucket: "quiz-e33a9.appspot.com",
  messagingSenderId: "968659313952",
  appId: "1:968659313952:web:c340776d5db8767fe72345",
  measurementId: "G-RZQSV00HWJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
