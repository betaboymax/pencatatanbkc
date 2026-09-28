'use client';
import {useMemo,useState} from 'react';

const product = {merek:'Contoh Merek', jenis:'SKM', isi:'20 batang', hje:'Rp 40.000', tarif:'Sesuai referensi tarif'};
const company = {nama:'PT Contoh Pengusaha BKC', nppbkc:'NPPBKC-XXXXXXXX', npwp:'00.000.000.0-000.000', alamat:'Alamat perusahaan dari master data'};

function Field({label, value, type='text', readOnly=false, placeholder='', options}) {
  return <div className="field"><label>{label}</label>{options?
    <select defaultValue={value||''}>{options.map(x=><option key={x}>{x}</option>)}</select>:
    <input type={type} defaultValue={value} readOnly={readOnly} placeholder={placeholder}/>}</div>
}
function Master(){
 return <div className="section"><h2>Identitas Pengusaha & Produk</h2><div className="notice">Data identitas dan referensi produk pada mockup diasumsikan ditarik dari master data agar tidak diinput berulang.</div>
 <div className="formgrid">
 <Field label="Nama Perusahaan" value={company.nama} readOnly/><Field label="NPPBKC" value={company.nppbkc} readOnly/><Field label="NPWP" value={company.npwp} readOnly/>
 <Field label="Alamat Perusahaan" value={company.alamat} readOnly/><Field label="Merek" value={product.merek} readOnly/><Field label="Jenis" value={product.jenis} readOnly/>
 <Field label="Isi" value={product.isi} readOnly/><Field label="HJE" value={product.hje} readOnly/><Field label="Tarif" value={product.tarif} readOnly/>
 </div></div>
}
function SaveButtons({back}){return <div className="actions"><button className="btn secondary" onClick={back}>Kembali</button><button className="btn secondary">Simpan Draft</button><button className="btn primary" onClick={()=>alert('Mockup: data tervalidasi dan disimpan.')}>Validasi & Simpan</button></div>}

function CSCK1({back}){
 return <><h1>CSCK-1</h1><div className="muted">Catatan Sediaan Produksi Hasil Tembakau</div><Master/>
 <div className="section"><h2>Transaksi Pencatatan</h2><div className="formgrid">
 <Field label="Tanggal *" type="date"/><Field label="Deskripsi *" placeholder="Uraian kegiatan"/><Field label="Pemasukan / Produksi (Batang/Gram) *" type="number"/>
 <Field label="Pengeluaran / Pengemasan (Batang/Gram) *" type="number"/><Field label="Jumlah Kemasan (Bungkus) *" type="number"/><Field label="Saldo (Batang/Gram)" value="Dihitung otomatis" readOnly/>
 <Field label="Keterangan" placeholder="Keterangan / bukti transaksi"/>
 </div><SaveButtons back={back}/></div><History code="CSCK-1"/></>
}
function CSCK3({back}){
 return <><h1>CSCK-3</h1><div className="muted">Catatan Sediaan Pita Cukai</div><Master/>
 <div className="section"><h2>Transaksi Pita Cukai</h2><div className="notice">Jenis kegiatan mengikuti format pencatatan: Saldo Awal, Penerimaan (+), Pemakaian (-), dan Pengembalian (-).</div>
 <div className="formgrid">
 <Field label="Tanggal Kegiatan *" type="date"/><Field label="Uraian Kegiatan *" options={['Saldo Awal','Penerimaan (+)','Pemakaian (-)','Pengembalian (-)']}/>
 <Field label="Nomor Dokumen Cukai" placeholder="Nomor dokumen"/><Field label="Tanggal Dokumen Cukai" type="date"/><Field label="Jumlah Pita Cukai (Keping) *" type="number"/>
 <Field label="Saldo Pita Cukai (Keping)" value="Dihitung otomatis" readOnly/><Field label="Keterangan" placeholder="Keterangan"/>
 </div><SaveButtons back={back}/></div><History code="CSCK-3"/></>
}
function CSCK9({back}){
 return <><h1>CSCK-9</h1><div className="muted">Catatan Sediaan Barang Kena Cukai Selesai Dibuat</div><Master/>
 <div className="section"><h2>Transaksi BKC Selesai Dibuat</h2><div className="formgrid">
 <Field label="Tanggal *" type="date"/><Field label="Deskripsi *" placeholder="Uraian transaksi"/><Field label="Pemasukan / Produksi (Bungkus) *" type="number"/>
 <Field label="Dilekati Pita Cukai (Bungkus) *" type="number"/><Field label="Pengeluaran / Penjualan (Bungkus) *" type="number"/>
 <Field label="Saldo Belum Dilekati (Bungkus)" value="Dihitung: Produksi - Dilekati" readOnly/><Field label="Saldo Sudah Dilekati (Bungkus)" value="Dihitung: Dilekati - Pengeluaran" readOnly/>
 <Field label="Keterangan" placeholder="Keterangan / bukti transaksi"/>
 </div><SaveButtons back={back}/></div><History code="CSCK-9"/></>
}
function CSCK8({back}){
 return <><h1>CSCK-8</h1><div className="muted">Pencatatan Pita Cukai Rusak</div>
 <div className="notice"><b>Catatan:</b> menu ini dipisahkan untuk pemenuhan pencatatan terkait pita cukai rusak. Elemen rinci perlu tetap dikunci terhadap format ketentuan CSCK-8 yang menjadi dasar implementasi.</div>
 <Master/><div className="section"><h2>Data Pita Cukai Rusak</h2><div className="formgrid">
 <Field label="Tanggal *" type="date"/><Field label="Nomor / Referensi Dokumen" placeholder="Referensi dokumen"/><Field label="Jumlah Pita Cukai Rusak (Keping) *" type="number"/>
 <Field label="Sebab / Uraian Kerusakan *" placeholder="Uraian kejadian"/><Field label="Keterangan" placeholder="Keterangan tambahan"/>
 </div><SaveButtons back={back}/></div><History code="CSCK-8"/></>
}
function History({code}){return <div className="section"><h2>Riwayat {code}</h2><table><thead><tr><th>Tanggal</th><th>Transaksi</th><th>Jumlah</th><th>Status</th></tr></thead><tbody>
<tr><td>28/09/2026</td><td>Contoh transaksi mockup</td><td>1.000</td><td><span className="badge ok">Tersimpan</span></td></tr>
</tbody></table></div>}

function Home({open}){
 const cards=[
 ['CSCK-1','Produksi Hasil Tembakau','Catat pemasukan/produksi, pengemasan, jumlah kemasan dan saldo.'],
 ['CSCK-3','Sediaan Pita Cukai','Catat saldo awal, penerimaan, pemakaian dan pengembalian pita cukai.'],
 ['CSCK-8','Pita Cukai Rusak','Catat kejadian dan jumlah pita cukai rusak.'],
 ['CSCK-9','BKC Selesai Dibuat','Catat produksi, pelekatan pita, pengeluaran/penjualan dan saldo.']];
 return <><h1>Beranda Pencatatan</h1><p className="muted">Apa yang ingin Anda catat hari ini?</p><div className="grid">{cards.map(c=><div className="card choice" key={c[0]} onClick={()=>open(c[0])}><div className="code">{c[0]}</div><div className="big">{c[1]}</div><div className="muted">{c[2]}</div></div>)}</div>
 <div className="section"><h2>Pencatatan Terakhir</h2><table><thead><tr><th>Jenis</th><th>Tanggal</th><th>Kegiatan</th><th>Status</th></tr></thead><tbody>
 <tr><td>CSCK-3</td><td>28/09/2026</td><td>Pemakaian pita cukai</td><td><span className="badge ok">Tersimpan</span></td></tr>
 <tr><td>CSCK-9</td><td>28/09/2026</td><td>BKC selesai dibuat</td><td><span className="badge ok">Tersimpan</span></td></tr></tbody></table></div></>
}
function Monitoring(){
 return <><h1>Monitoring Kepatuhan</h1><p className="muted">Dashboard petugas untuk memonitor pemenuhan pencatatan per jenis CSCK.</p>
 <div className="grid"><div className="card"><div className="muted">Pengusaha Dimonitor</div><div className="metric">125</div></div><div className="card"><div className="muted">Terpenuhi</div><div className="metric">103</div></div><div className="card"><div className="muted">Perlu Perhatian</div><div className="metric">17</div></div><div className="card"><div className="muted">Belum Memenuhi</div><div className="metric">5</div></div></div>
 <div className="section"><h2>Status Pemenuhan Pencatatan</h2><table><thead><tr><th>Pengusaha</th><th>CSCK-1</th><th>CSCK-3</th><th>CSCK-8</th><th>CSCK-9</th><th>Indikasi</th></tr></thead><tbody>
 <tr><td>PT Contoh A</td><td><span className="badge ok">Terpenuhi</span></td><td><span className="badge ok">Terpenuhi</span></td><td><span className="badge info">Nihil</span></td><td><span className="badge ok">Terpenuhi</span></td><td>Sesuai</td></tr>
 <tr><td>PT Contoh B</td><td><span className="badge ok">Terpenuhi</span></td><td><span className="badge warn">Terlambat</span></td><td><span className="badge info">Nihil</span></td><td><span className="badge bad">Belum</span></td><td>Perlu perhatian</td></tr>
 </tbody></table></div>
 <div className="section"><h2>Prinsip Monitoring</h2><div className="grid"><div className="card"><b>Kelengkapan</b><p className="muted">Pemenuhan unsur pencatatan.</p></div><div className="card"><b>Ketepatan Waktu</b><p className="muted">Waktu perekaman transaksi.</p></div><div className="card"><b>Konsistensi</b><p className="muted">Keterkaitan antar-CSCK.</p></div><div className="card"><b>Audit Trail</b><p className="muted">Riwayat input dan perubahan.</p></div></div></div></>
}

export default function Page(){
 const [role,setRole]=useState('pengusaha'); const [view,setView]=useState('home');
 const open=v=>setView(v); const back=()=>setView('home');
 const content = role==='petugas' ? <Monitoring/> :
 view==='CSCK-1'?<CSCK1 back={back}/>:view==='CSCK-3'?<CSCK3 back={back}/>:view==='CSCK-8'?<CSCK8 back={back}/>:view==='CSCK-9'?<CSCK9 back={back}/>:<Home open={open}/>;
 return <div className="app"><aside className="sidebar"><div className="brand">e-Catat BKC<small>APLIKASI PENCATATAN ONLINE</small></div>
 <div className="nav">{role==='pengusaha'?<><button className={view==='home'?'active':''} onClick={back}>Beranda Pencatatan</button><button onClick={()=>open('CSCK-1')}>CSCK-1</button><button onClick={()=>open('CSCK-3')}>CSCK-3</button><button onClick={()=>open('CSCK-8')}>CSCK-8</button><button onClick={()=>open('CSCK-9')}>CSCK-9</button><button>Riwayat Pencatatan</button></>:<><button className="active">Monitoring Kepatuhan</button><button>Detail Pengusaha</button><button>Rekonsiliasi Data</button><button>Analisis</button></>}</div></aside>
 <main className="main"><div className="top"><b>{role==='pengusaha'?'Pengusaha BKC':'Petugas DJBC'}</b><button className="btn yellow" onClick={()=>{setRole(role==='pengusaha'?'petugas':'pengusaha');setView('home')}}>Ganti Role: {role==='pengusaha'?'Petugas DJBC':'Pengusaha BKC'}</button></div><div className="content">{content}</div></main></div>
}
