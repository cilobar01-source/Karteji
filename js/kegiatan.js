
// pages/kegiatan.js
import { tambahData, ambilData } from "./data.js";
import { qs, toast } from "./ui.js";

const area = document.getElementById("contentArea");
area.innerHTML = `
  <div class="card-glass span-5">
    <p class="card-title">Buat Agenda</p>
    <div class="input-wrap"><label>Judul</label><input id="judul" type="text"></div>
    <div class="input-wrap"><label>Tanggal</label><input id="tgl" type="date"></div>
    <div class="input-wrap"><label>Deskripsi</label><input id="desk" type="text"></div>
    <div style="margin-top:10px"><button id="add" class="btn-glass">Tambah</button></div>
  </div>
  <div class="card-glass span-7">
    <p class="card-title">Agenda</p>
    <div id="list"></div>
  </div>
`;

async function render(){
  const items = await ambilData("kegiatan");
  const html = items.reverse().map(e=>`
    <div class="info-chip" style="width:100%; justify-content:space-between">
      <span>📅 ${e.judul}</span>
      <small>${new Date(e.tanggal).toLocaleDateString('id-ID')}</small>
    </div>`).join("");
  qs("#list").innerHTML = html || '<div class="info-chip">Belum ada kegiatan.</div>';
}
render();

qs("#add").addEventListener("click", async ()=>{
  const judul = qs("#judul").value.trim();
  const tgl = qs("#tgl").value;
  const deskripsi = qs("#desk").value.trim();
  if(!judul || !tgl) return toast("Lengkapi judul & tanggal");
      await tambahData("kegiatan", { judul, tanggal: new Date(tgl).getTime(), deskripsi, id_katar: "cilosari_barat" });"kegiatan", { judul, tanggal: new Date(tgl).getTime(), deskripsi });
  toast("Agenda dibuat");
  render();
});

