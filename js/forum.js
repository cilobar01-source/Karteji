
// pages/forum.js
import { tambahData, ambilData } from "./data.js";
import { qs, toast } from "./ui.js";

const area = document.getElementById("contentArea");
area.innerHTML = `
  <div class="card-glass span-8">
    <p class="card-title">Thread Terkini</p>
    <div id="list"></div>
  </div>
  <div class="card-glass span-4">
    <p class="card-title">Buat Thread</p>
    <div class="input-wrap"><label>Judul</label><input id="judul" type="text"></div>
    <div class="input-wrap"><label>Pesan</label><input id="pesan" type="text"></div>
    <div style="margin-top:10px"><button id="post" class="btn-glass">Post</button></div>
  </div>
`;

async function render(){
  const items = await ambilData("forum");
  const html = items.reverse().map(e=>`
    <div class="card-glass">
      <p class="card-title">${e.judul||'(tanpa judul)'}</p>
      <p style="margin:.2rem 0;">${e.pesan||''}</p>
      <small class="info-chip">${new Date(e.waktu||Date.now()).toLocaleString('id-ID')}</small>
    </div>`).join("");
  qs("#list").innerHTML = html || '<div class="info-chip">Belum ada diskusi.</div>';
}
render();

qs("#post").addEventListener("click", async ()=>{
  const judul = qs("#judul").value.trim();
  const pesan = qs("#pesan").value.trim();
  if(!judul || !pesan) return toast("Lengkapi judul & pesan");
      await tambahData("forum", { judul, pesan, waktu: Date.now(), id_katar: "cilosari_barat" });"forum", { judul, pesan, waktu: Date.now() });
  toast("Thread dibuat");
  render();
});

