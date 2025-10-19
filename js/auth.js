// js/auth.js
import { auth, db } from './firebase.js';
import {
  onAuthStateChanged, signOut, signInWithEmailAndPassword,
  createUserWithEmailAndPassword, sendPasswordResetEmail,
  setPersistence, browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { doc, getDoc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Email super admin awal (opsional)
const SUPER_ADMIN_EMAILS = [
  "wisnu@cilosaribarat.id" // ganti dengan emailmu
];

// persist login
await setPersistence(auth, browserLocalPersistence);

// Membuat dokumen user jika belum ada
async function ensureUserDoc(user) {
  const uref = doc(db, "users", user.uid);
  const snap = await getDoc(uref);
  if (!snap.exists()) {
    let role = "anggota";
    if (SUPER_ADMIN_EMAILS.includes(user.email)) role = "super_admin";
    await setDoc(uref, {
      email: user.email,
      role,
      createdAt: serverTimestamp()
    }, { merge: true });
  }
}

export function onAuth(cb) { return onAuthStateChanged(auth, cb); }

export async function login(email, pass) {
  const { user } = await signInWithEmailAndPassword(auth, email, pass);
  await ensureUserDoc(user);
  return user;
}

export async function register(email, pass) {
  const { user } = await createUserWithEmailAndPassword(auth, email, pass);
  await ensureUserDoc(user);
  return user;
}

export async function resetPassword(email) {
  return sendPasswordResetEmail(auth, email);
}

export async function logout() {
  return signOut(auth);
}
