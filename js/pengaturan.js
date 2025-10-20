
// pages/pengaturan.js
import { db } from "./firebase.js";
import { doc, getDoc, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { qs, toast } from "./ui.js";
import { uploadToCloudinary } from "./cloudinary.js";

const area = document.getElementById("contentArea");
area.innerHTML = `
  <div class="card-glass span-6">
    <p class="card-title">Identitas Portal</p>
    <div class="input-wrap"><label>Nama Portal</label><input id="namaPortal" type="text"></div>
    <div class="input-wrap"><label>Logo</label><input id="logoUpload" type="file" accept="image/*"></div>
    <div style="margin-top:10px"><button id="save" class="btn-glass">Simpan</button></div>
  </div>
  <div class="card-glass span-6">
    <p class="card-title">Pratinjau</p>
    <img id="previewLogo" class="logo-glow" src="../assets/icons/kt.svg" alt="logo" style="width:72px;height:72px">
    <div class="info-chip" id="previewName">Portal Karang Taruna</div>
  </div>
`;

async function loadBranding(){
  const ref = doc(db, "sistem", "branding");
  const snap = await getDoc(ref);
  if(snap.exists()){
    const d = snap.data();
    qs("#namaPortal").value = d.nama_portal||"";
    qs("#previewName").textContent = d.nama_portal||"Portal Karang Taruna";
    if(d.logo) qs("#previewLogo").src = d.logo;
  }else{
    await setDoc(ref, { nama_portal:"Portal Karang Taruna" });
  }
}
loadBranding();

qs("#save").addEventListener("click", async ()=>{
  const ref = doc(db, "sistem", "branding");
  const nama = qs("#namaPortal").value.trim();
  let logoUrl = null;
  const file = qs("#logoUpload").files[0];
  if(file) logoUrl = await uploadToCloudinary(file, "logo");
  const payload = { nama_portal:nama };
  if(logoUrl) payload.logo = logoUrl;
  payload.id_katar = "cilosari_barat"; await updateDoc(ref, payload);
  toast("Pengaturan disimpan");
  loadBranding();
});
