// js/auth.js (v7.2 Multi-Unit Ready)
import { auth, db } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import {
  doc,
  setDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

/**
 * 🔑 LOGIN AKUN BIASA (anggota/pengurus)
 */
export async function login(email, password) {
  const userCred = await signInWithEmailAndPassword(auth, email, password);
  const uid = userCred.user.uid;
  const profileRef = doc(db, "users", uid);
  const snap = await getDoc(profileRef);

  if (!snap.exists()) {
    throw new Error("Profil tidak ditemukan di database.");
  }

  const data = snap.data();
  // Simpan sementara di sessionStorage
  sessionStorage.setItem("userProfile", JSON.stringify(data));
  return data;
}

/**
 * 🧑‍💼 REGISTER ANGGOTA BIASA (bukan Karang Taruna baru)
 * - digunakan untuk menambah akun anggota dalam unit yang sudah ada
 */
export async function registerAnggota({ nama, email, password, id_katar }) {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  const uid = userCred.user.uid;

  const userData = {
    nama,
    email,
    role: "anggota",
    id_katar,
    dibuat: Date.now(),
  };
  await setDoc(doc(db, "users", uid), userData);

  return userData;
}

/**
 * 🏠 REGISTER KARANG TARUNA BARU (super_admin)
 * - dipakai oleh form “Daftar Karang Taruna Baru”
 */
export async function registerKarangTaruna({ nama_katar, id_katar, email, password, logoURL = "" }) {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  const uid = userCred.user.uid;

  // 1️⃣ Simpan user sebagai super_admin
  await setDoc(doc(db, "users", uid), {
    nama: "Ketua Karang Taruna",
    email,
    role: "super_admin",
    id_katar,
    dibuat: Date.now(),
  });

  // 2️⃣ Simpan identitas Karang Taruna
  await setDoc(doc(db, "karangtaruna", id_katar), {
    nama: nama_katar,
    logo: logoURL,
    dibuat: Date.now(),
  });

  // 3️⃣ Branding sistem
  await setDoc(doc(db, "sistem", "branding_" + id_katar), {
    id_katar,
    nama_portal: nama_katar,
    logo: logoURL,
  });

  return { uid, id_katar };
}

/**
 * 🚪 LOGOUT
 */
export async function logout() {
  await signOut(auth);
  sessionStorage.removeItem("userProfile");
  location.href = "/auth/login.html";
}

/**
 * 👀 LISTEN AUTH STATE
 */
export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      callback(null);
      return;
    }
    const docRef = doc(db, "users", user.uid);
    const snap = await getDoc(docRef);
    callback({ user, profile: snap.exists() ? snap.data() : null });
  });
}
