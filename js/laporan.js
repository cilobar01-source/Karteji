
// pages/laporan.js
import { ambilData } from "./data.js";
import { qs } from "./ui.js";

const area = document.getElementById("contentArea");
area.innerHTML = `
  <div class="card-glass span-12">
    <p class="card-title">Ringkasan Bulan Ini</p>
    <div id="sum" class="grid"></div>
  </div>
`;

async function render(){
  const kas = await ambilData("kas");
  const kegiatan = await ambilData("kegiatan");
  const anggota = await ambilData("anggota");

  const totalKas = kas.reduce((a,b)=> a + Number(b.nominal||0), 0);
  const html = `
    <div class="card-glass span-4"><div class="card-title">Total Kas</div><div class="card-value">Rp ${totalKas.toLocaleString('id-ID')}</div></div>
    <div class="card-glass span-4"><div class="card-title">Kegiatan</div><div class="card-value">${kegiatan.length}</div></div>
    <div class="card-glass span-4"><div class="card-title">Anggota</div><div class="card-value">${anggota.length}</div></div>
  `;
  qs("#sum").innerHTML = html;
}
render();
