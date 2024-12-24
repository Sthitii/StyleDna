'use client';

import firebase_app from "./config";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const auth = getAuth(firebase_app);
;
export async function signUp(email, password) {
    let result = null,
        error = null;
    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export async function signIn(email, password) {
    let result = null,
        error = null;
    try {
        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export async function signInWithGoogle() {
    let result = null,
        error = null;
    try {
        const provider = new GoogleAuthProvider();
        result = await signInWithPopup(auth, provider);
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export { auth };