
// js/guard.js
import { auth, db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { UNIT_ID, UNIT_PRIVACY } from "./config.js";

export let currentUser = null;
export let currentProfile = null;

// Wait for auth state & load profile
export function onReady(cb){
  const unsub = auth.onAuthStateChanged(async (user)=>{
    if(!user){
      // not logged in -> go to login
      if(!location.pathname.includes("/auth/")) location.href = "/auth/login.html";
      return;
    }
    currentUser = user;
    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);
    currentProfile = snap.exists() ? snap.data() : null;

    // Enforce unit privacy
    if(UNIT_PRIVACY && currentProfile && currentProfile.id_katar !== UNIT_ID){
      alert("🚫 Akses ditolak: Anda bukan anggota Karang Taruna ini.");
      await auth.signOut();
      location.href = "/auth/login.html";
      return;
    }
    cb({ user, profile: currentProfile });
  });
  return unsub;
}

// Utility role check
export function requireRole(...roles){
  if(!currentProfile) return false;
  return roles.includes(currentProfile.role);
}
