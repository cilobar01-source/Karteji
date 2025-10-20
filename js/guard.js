import { auth, db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { setUnitID } from "./config.js";

export let currentUser=null;
export let currentProfile=null;

auth.onAuthStateChanged(async(user)=>{
  if(!user){ if(!location.pathname.includes("/auth/")) location.href="/auth/index.html"; return; }
  const snap=await getDoc(doc(db,"users",user.uid));
  if(!snap.exists()){ alert("Profil tidak ditemukan."); await auth.signOut(); return; }
  currentUser=user; currentProfile=snap.data();
  setUnitID(currentProfile.id_katar);

  // Verifikasi status anggota
  if(currentProfile.role==="anggota" && currentProfile.status!=="approved"){
    alert("🚫 Akun Anda belum diverifikasi pengurus Karang Taruna.");
    await auth.signOut(); location.href="/auth/portal_auth.html"; return;
  }
});
