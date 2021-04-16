//src/Latihan1.js
import React from "react";

function Latihan1() {
  return (
    <div>
      <h3>Latihan1</h3>
      <h4>Nama Collection</h4>
      <input
        type="text"
        name="nmCollection"
        placeholder="Isi Nama Collection"
        onChange={(e) => console.log(e.target.value)}
      />
      <h4>Nama Dokumen</h4>
      <input
        type="text"
        name="nmDokumen"
        placeholder="Isi Kolom1"
        onChange={(e) => console.log(e.target.value)}
      />
      <h4>Kolom1</h4>
      <input
        type="text"
        name="kolom1"
        placeholder="Isi Kolom1"
        onChange={(e) => console.log(e.target.value)}
      />
      <h4>Kolom2</h4>
      <input
        type="text"
        name="kolom2"
        placeholder="Isi Kolom1"
        onChange={(e) => console.log(e.target.value)}
      />
    </div>
  );
}

export default Latihan1;
