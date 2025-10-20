
// js/autoReport.js
export async function generateMonthlyReport({kas, kegiatan, anggota, unit="Karang Taruna Cilosari Barat"}){
  // Use jsPDF (loaded via CDN in laporan.html)
  const { jsPDF } = window.jspdf || {};
  if(!jsPDF){ alert("jsPDF belum termuat"); return; }
  const doc = new jsPDF({ unit:"pt", format:"a4" });
  const now = new Date();
  const title = `Laporan Bulanan - ${unit}`;
  const periode = now.toLocaleDateString('id-ID', { month:'long', year:'numeric' });

  const totalKas = (kas||[]).reduce((a,b)=> a + Number(b.nominal||0), 0);

  doc.setFont("helvetica","bold"); doc.setFontSize(16);
  doc.text(title, 40, 50);
  doc.setFont("helvetica","normal"); doc.setFontSize(11);
  doc.text(`Periode: ${periode}`, 40, 70);

  doc.setFontSize(13); doc.text("Ringkasan", 40, 110);
  doc.setFontSize(11);
  doc.text(`• Total Kas: Rp ${totalKas.toLocaleString('id-ID')}`, 40, 130);
  doc.text(`• Jumlah Kegiatan: ${(kegiatan||[]).length}`, 40, 148);
  doc.text(`• Jumlah Anggota: ${(anggota||[]).length}`, 40, 166);

  doc.setFontSize(13); doc.text("Transaksi Terakhir", 40, 200);
  doc.setFontSize(10);
  (kas||[]).slice(-8).reverse().forEach((t, i)=>{
    const y = 220 + i*16;
    doc.text(`${new Date(t.tanggal||Date.now()).toLocaleDateString('id-ID')}  Rp ${Number(t.nominal||0).toLocaleString('id-ID')}  ${t.ket||''}`, 46, y);
  });

  doc.save(`laporan_${now.getMonth()+1}_${now.getFullYear()}.pdf`);
}
