//src/Latihan1.js
import React, { useState } from "react";
//import firebase
import { db } from "./firebase";

//setting ini jika menggunakan emulator firestore
//comment jika mau langsung koneksi ke cloud firebase
//.settings({ host: "localhost:8080", ssl: false });

function Latihan1() {
  //state
  const [nmCollection, setNmCollection] = useState("");
  const [nmDokumen, setNmDokumen] = useState("");
  const [kolom1, setKolom1] = useState("");
  const [kolom2, setKolom2] = useState("");
  //state untuk data dari hasil pembacaan

  //button simpan fuction
  function onSimpanDokDgId() {
    if (nmCollection === "") return console.log("Nama Koleksi Kosong");
    if (nmDokumen === "") return console.log("Nama Dokumen Kosong");
    console.log(nmCollection, nmDokumen, kolom1, kolom2);
    db.collection(nmCollection)
      .doc(nmDokumen)
      .set({
        kolom1: kolom1,
        kolom2: kolom2,
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }

  return (
    <div>
      <h3>Latihan1</h3>
      <h4>Nama Collection</h4>
      <input
        type="text"
        name="nmCollection"
        placeholder="Isi Nama Collection"
        onChange={(e) => setNmCollection(e.target.value)}
      />
      <h4>Nama Dokumen</h4>
      <input
        type="text"
        name="nmDokumen"
        placeholder="Isi Kolom1"
        onChange={(e) => setNmDokumen(e.target.value)}
      />
      <h4>Kolom1</h4>
      <input
        type="text"
        name="kolom1"
        placeholder="Isi Kolom1"
        onChange={(e) => setKolom1(e.target.value)}
      />
      <h4>Kolom2</h4>
      <input
        type="text"
        name="kolom2"
        placeholder="Isi Kolom2"
        onChange={(e) => setKolom2(e.target.value)}
      />
      <br></br>
      <br></br>
      <button onClick={onSimpanDokDgId}>SIMPAN DOK DG ID</button>
    </div>
  );
}

export default Latihan1;
