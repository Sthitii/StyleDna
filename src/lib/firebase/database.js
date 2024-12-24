import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { auth } from './auth';
import firebase_app from './config';

const db = getFirestore(firebase_app);

export async function saveBodyType(bodyType) {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No user logged in');

    await setDoc(doc(db, 'bodyTypes', user.uid), {
      email: user.email,
      bodyType,
      updatedAt: new Date().toISOString()
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error saving body type:', error);
    return { error: error.message };
  }
}