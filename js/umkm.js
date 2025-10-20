
// pages/umkm.js
import { tambahData, ambilData } from "./data.js";
import { uploadToCloudinary } from "./cloudinary.js";
import { qs, toast } from "./ui.js";

const area = document.getElementById("contentArea");
area.innerHTML = `
  <div class="card-glass span-5">
    <p class="card-title">Tambah UMKM</p>
    <div class="input-wrap"><label>Nama Usaha</label><input id="nama" type="text"></div>
    <div class="input-wrap"><label>Deskripsi</label><input id="desk" type="text"></div>
    <div class="input-wrap"><label>Foto Produk</label><input id="foto" type="file" accept="image/*"></div>
    <div style="margin-top:10px"><button id="add" class="btn-glass">Tambah</button></div>
  </div>
  <div class="card-glass span-7">
    <p class="card-title">Daftar UMKM</p>
    <div id="list" class="grid"></div>
  </div>
`;

async function render(){
  const items = await ambilData("umkm");
  const html = items.reverse().map(e=>`
    <div class="card-glass span-12">
      <div style="display:flex;gap:12px;align-items:center">
        <img src="${e.foto||'../assets/icons/kt.svg'}" style="width:56px;height:56px;border-radius:12px;border:1px solid rgba(255,255,255,.2)">
        <div>
          <div class="card-title" style="margin:0">${e.nama}</div>
          <div style="opacity:.85">${e.deskripsi||''}</div>
        </div>
      </div>
    </div>
  `).join("");
  qs("#list").innerHTML = html || '<div class="info-chip">Belum ada UMKM.</div>';
}
render();

qs("#add").addEventListener("click", async ()=>{
  const nama = qs("#nama").value.trim();
  const deskripsi = qs("#desk").value.trim();
  const file = qs("#foto").files[0];
  if(!nama) return toast("Nama UMKM wajib");
  let url = "";
  if(file) url = await uploadToCloudinary(file, "umkm");
      await tambahData("umkm", { nama, deskripsi, foto:url, dibuat: Date.now(), id_katar: "cilosari_barat" });"umkm", { nama, deskripsi, foto:url, dibuat: Date.now() });
  toast("UMKM ditambahkan");
  render();
});

