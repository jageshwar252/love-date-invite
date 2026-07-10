import { getApps, initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore';
import { firebaseConfig, firebaseConfigured } from '../firebaseConfig';

function getFirebaseServices() {
  if (!firebaseConfigured) {
    throw new Error('Firebase is not connected yet. Add your Firebase web configuration first.');
  }

  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  return { auth: getAuth(app), database: getFirestore(app) };
}

// This is called only after the person explicitly taps the send button.
export async function saveDateResponse({ quizAnswers, loveAnswer, dateChoice, theme, message, date, time, dateIdea }) {
  const { auth, database } = getFirebaseServices();

  if (!auth.currentUser) {
    await signInAnonymously(auth);
  }

  await addDoc(collection(database, 'dateResponses'), {
    quizAnswers,
    loveAnswer,
    dateChoice,
    theme,
    message,
    date,
    time,
    dateIdea,
    submittedAt: serverTimestamp(),
  });
}
