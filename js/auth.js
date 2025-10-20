// js/auth.js
import { auth, db } from "./firebase.js";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// ======================
// LOGIN
// ======================
export async function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// ======================
// REGISTER
// ======================
// - Karang Taruna (super_admin): otomatis buat id_katar + branding + unit_info
// - Anggota: wajib input id_katar valid
export async function register({ email, password, nama, role = "anggota", id_katar = null, nama_katar = null }) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  let unit = id_katar;

  if (role === "super_admin") {
    unit = unit || (nama_katar || nama || "karang_taruna")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/(^_|_$)/g, "");

    // Branding awal
    await setDoc(doc(db, "sistem", "branding"), {
      nama_portal: `Karang Taruna ${nama_katar || nama}`,
      logo: "",
      id_katar: unit
    });

    // Catat unit info
    await setDoc(doc(db, "unit_info", unit), {
      nama_unit: `Karang Taruna ${nama_katar || nama}`,
      dibuat: Date.now(),
      dibuat_oleh: cred.user.uid
    });
  } else {
    if (!unit) throw new Error("ID Karang Taruna wajib diisi untuk pendaftaran anggota.");
  }

  // Simpan profil user
  await setDoc(doc(db, "users", cred.user.uid), {
    nama,
    email,
    role,
    id_katar: unit,
    createdAt: Date.now()
  });

  return cred;
}

// ======================
// LOGOUT
// ======================
export async function logout() {
  await signOut(auth);
  location.href = "/auth/login.html";
}
