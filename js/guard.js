// js/guard.js
import { auth, db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { UNIT_PRIVACY } from "./config.js";

export let currentUser = null;
export let currentProfile = null;
export let UNIT_ID = null;

// Menunggu auth siap, lalu ambil profil user & id_katar
export function onReady(cb) {
  const unsub = auth.onAuthStateChanged(async (user) => {
    if (!user) {
      if (!location.pathname.includes("/auth/")) location.href = "/auth/login.html";
      return;
    }

    currentUser = user;
    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);
    currentProfile = snap.exists() ? snap.data() : null;
    UNIT_ID = currentProfile?.id_katar || null;

    if (UNIT_PRIVACY && !UNIT_ID) {
      alert("Akun belum terhubung ke Karang Taruna mana pun (id_katar kosong).");
      await auth.signOut();
      location.href = "/auth/login.html";
      return;
    }

    cb({ user, profile: currentProfile, unit: UNIT_ID });
  });
  return unsub;
}

// Validasi role
export function requireRole(...roles) {
  return currentProfile && roles.includes(currentProfile.role);
}
