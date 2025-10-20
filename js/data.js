
// js/data.js
import { db } from "./firebase.js";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, onSnapshot } 
from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

export async function tambahData(coll, data){
  return addDoc(collection(db, coll), data);
}

export async function ambilData(coll){
  const snap = await getDocs(collection(db, coll));
  return snap.docs.map(d => ({ id:d.id, ...d.data() }));
}

export async function ubahData(coll, id, data){
  return updateDoc(doc(db, coll, id), data);
}

export async function hapusData(coll, id){
  return deleteDoc(doc(db, coll, id));
}

export function listenDoc(path, cb){
  // path contoh: "sistem/branding"
  const [coll, id] = path.split("/");
  return onSnapshot(doc(db, coll, id), (d)=> cb({ id:d.id, ...d.data() }));
}
