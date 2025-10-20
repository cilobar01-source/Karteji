
// js/auth.js
import { auth, db } from "./firebase.js";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

export async function login(email, password){
  return signInWithEmailAndPassword(auth, email, password);
}

export async function register({email, password, nama, role="anggota", id_katar="cilosari_barat"}){
  const user = await createUserWithEmailAndPassword(auth, email, password);
  await setDoc(doc(db, "users", user.user.uid), { nama, email, role, id_katar, createdAt: Date.now() });
  return user;
}

export async function logout(){
  await signOut(auth);
  location.href = "/auth/login.html";
}
