
// pages/anggota.js
import { tambahData, ambilData } from "./data.js";
import { uploadToCloudinary } from "./cloudinary.js";
import { qs, toast } from "./ui.js";

const area = document.getElementById("contentArea");
area.innerHTML = `
  <div class="card-glass span-5">
    <p class="card-title">Tambah Anggota</p>
    <div class="input-wrap"><label>Nama</label><input id="nama" type="text"></div>
    <div class="input-wrap"><label>Email (opsional)</label><input id="email" type="email"></div>
    <div class="input-wrap"><label>Foto Profil</label><input id="foto" type="file" accept="image/*"></div>
    <div style="margin-top:10px"><button id="add" class="btn-glass">Tambah</button></div>
  </div>
  <div class="card-glass span-7">
    <p class="card-title">Daftar Anggota</p>
    <div id="list"></div>
  </div>
`;

async function render(){
  const items = await ambilData("anggota");
  const html = items.reverse().map(e=>`
    <div class="info-chip" style="width:100%; justify-content:space-between">
      <span>👤 ${e.nama}</span>
      <small>${e.email||''}</small>
    </div>`).join("");
  qs("#list").innerHTML = html || '<div class="info-chip">Belum ada anggota.</div>';
}
render();

qs("#add").addEventListener("click", async ()=>{
  const nama = qs("#nama").value.trim();
  const email = qs("#email").value.trim();
  const file = qs("#foto").files[0];
  if(!nama) return toast("Nama wajib");
  let fotoURL = "";
  if(file){ fotoURL = await uploadToCloudinary(file, "profil"); }
      await tambahData("anggota", { nama, email, foto: fotoURL, dibuat: Date.now(), id_katar: "cilosari_barat" });"anggota", { nama, email, foto: fotoURL, dibuat: Date.now() });
  toast("Anggota ditambahkan");
  render();
});

