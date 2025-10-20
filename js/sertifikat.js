
// pages/sertifikat.js
import { tambahData, ambilData } from "./data.js";
import { qs } from "./ui.js";

const area = document.getElementById("contentArea");
area.innerHTML = `
  <div class="card-glass span-12">
    <p class="card-title">Sertifikat (daftar penerima)</p>
    <div id="list"></div>
  </div>
`;

async function render(){
  const items = await ambilData("sertifikat");
  const html = items.reverse().map(e=>`
    <div class="info-chip" style="width:100%; justify-content:space-between">
      <span>🪪 ${e.nama} • ${e.kegiatan}</span>
      <small>${new Date(e.tanggal).toLocaleDateString('id-ID')}</small>
    </div>`).join("");
  qs("#list").innerHTML = html || '<div class="info-chip">Belum ada sertifikat.</div>';
}
render();
