
// pages/kas.js
import { tambahData, ambilData, ubahData, hapusData } from "./data.js";
import { qs, toast } from "./ui.js";

const area = document.getElementById("contentArea");
area.innerHTML = `
  <div class="card-glass span-6">
    <p class="card-title">Tambah Transaksi</p>
    <div class="input-wrap"><label>Nominal</label><input id="nominal" type="number"></div>
    <div class="input-wrap"><label>Keterangan</label><input id="ket" type="text"></div>
    <div style="margin-top:10px"><button id="add" class="btn-glass">Simpan</button></div>
  </div>
  <div class="card-glass span-6">
    <p class="card-title">Transaksi Terakhir</p>
    <div id="list"></div>
  </div>
`;

async function render(){
  const data = await ambilData("kas");
  const html = data.slice(-10).reverse().map(t=>`
    <div class="info-chip" style="justify-content:space-between; width:100%">
      <span>Rp ${Number(t.nominal).toLocaleString('id-ID')} • ${t.ket||''}</span>
      <small>${new Date(t.tanggal||Date.now()).toLocaleDateString('id-ID')}</small>
    </div>
  `).join("");
  qs("#list").innerHTML = html || '<div class="info-chip">Belum ada transaksi.</div>';
}
render();

qs("#add").addEventListener("click", async ()=>{
  const nominal = Number(qs("#nominal").value||0);
  const ket = qs("#ket").value||"";
  if(!nominal) return toast("Nominal tidak boleh kosong");
      await tambahData("kas", { nominal, ket, tanggal: Date.now(), id_katar: "cilosari_barat" });"kas", { nominal, ket, tanggal: Date.now() });
  toast("Transaksi disimpan");
  render();
});

