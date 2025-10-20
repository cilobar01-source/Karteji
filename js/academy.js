
// pages/academy.js
import { tambahData, ambilData } from "./data.js";
import { qs } from "./ui.js";

const area = document.getElementById("contentArea");
area.innerHTML = `
  <div class="card-glass span-5">
    <p class="card-title">Tambah Modul</p>
    <div class="input-wrap"><label>Judul</label><input id="judul" type="text"></div>
    <div class="input-wrap"><label>Link Video / Materi</label><input id="link" type="text" placeholder="https://..."></div>
    <div style="margin-top:10px"><button id="add" class="btn-glass">Tambah</button></div>
  </div>
  <div class="card-glass span-7">
    <p class="card-title">Daftar Modul</p>
    <div id="list"></div>
  </div>
`;

async function render(){
  const items = await ambilData("academy");
  const html = items.reverse().map(e=>`
    <div class="info-chip" style="width:100%; justify-content:space-between">
      <span>🎓 ${e.judul}</span>
      <a class="btn-glass" href="${e.link}" target="_blank">Buka</a>
    </div>`).join("");
  qs("#list").innerHTML = html || '<div class="info-chip">Belum ada modul.</div>';
}
render();

qs("#add").addEventListener("click", async ()=>{
  const judul = qs("#judul").value.trim();
  const link = qs("#link").value.trim();
  if(!judul || !link) return alert("Lengkapi judul & link");
      await tambahData("academy", { judul, link, dibuat: Date.now(), id_katar: "cilosari_barat" });"academy", { judul, link, dibuat: Date.now() });
  render();
});

