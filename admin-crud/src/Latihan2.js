//src/Latihan2.js
import React, { useState } from "react";
//import firebase
import { db } from "./firebase";

//setting ini jika menggunakan emulator firestore
//comment jika mau langsung koneksi ke cloud firebase
//settings({ host: "localhost:8080", ssl: false });

function Latihan2() {
  //state
  const [nmCollection, setNmCollection] = useState("");
  const [nmDokumen, setNmDokumen] = useState("");
  const [kolom1, setKolom1] = useState("");
  const [kolom2, setKolom2] = useState("");
  const [kolom3, setKolom3] = useState("");
  //state loading pada proses asyncrounous
  const [loading, setLoading] = useState(false);
  //state untuk data dari hasil pembacaan

  const [docId, setDocId] = useState("");

  //button simpan fuction
  function onSimpanDok() {
    if (nmCollection === "") return console.log("Nama Koleksi Kosong");
    if (kolom1 === "") return console.log("Kolom1 Kosong");
    if (kolom2 === "") return console.log("Kolom2 Kosong");
    console.log(nmCollection, kolom1, kolom2);
    setLoading(true);
    db.collection(nmCollection)
      .add({
        kolom1: kolom1,
        kolom2: kolom2,
      })
      .then((doc) => {
        console.log("Added doc with ID : ", doc.id);
        setDocId(doc.id);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }

  function onSimpanDokDgIdMerge() {
    if (nmCollection === "") return console.log("Nama Koleksi Kosong");
    if (nmDokumen === "") return console.log("Nama Dokumen Kosong");
    if (kolom3 === "") return console.log("Kolom3 Kosong");
    console.log(nmCollection, nmDokumen, kolom3);
    setLoading(true);
    db.collection(nmCollection)
      .doc(nmDokumen)
      .set(
        {
          kolom3: kolom3,
        },
        { merge: true }
      )
      .then(() => {
        console.log("Document successfully written!");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }

  if (loading) {
    return <>Tunggu Masih Proses, Loading...</>;
  }

  return (
    <div>
      <h3>Latihan 2 Menambah Data dengan ID Dokumen Otomatis</h3>
      <fieldset>
        <legend>Set Data : tanpa mengisi nama dokumen</legend>
        <label htmlFor="nmCollection">Nama Collection :</label>
        <input
          style={{ marginLeft: "1em" }}
          type="text"
          name="nmCollection"
          placeholder="Isi Nama Collection"
          onChange={(e) => setNmCollection(e.target.value)}
        />
        <br></br>
        <br></br>
        <label htmlFor="nmDokumen">Nama Dokumen :</label>
        <input
          style={{ marginLeft: "1em" }}
          type="text"
          name="nmDokumen"
          placeholder="Isi Kolom1"
          onChange={(e) => setNmDokumen(e.target.value)}
        />
        <br></br>
        <br></br>
        <label htmlFor="kolom1">Kolom1 :</label>
        <input
          style={{ marginLeft: "1em" }}
          type="text"
          name="kolom1"
          placeholder="Isi Kolom1"
          onChange={(e) => setKolom1(e.target.value)}
        />
        <br></br>
        <br></br>
        <label htmlFor="kolom2">Kolom2 :</label>
        <input
          style={{ marginLeft: "1em" }}
          type="text"
          name="kolom2"
          placeholder="Isi Kolom2"
          onChange={(e) => setKolom2(e.target.value)}
        />
        <br></br>
        <br></br>
        <button onClick={onSimpanDok}>SIMPAN DOK</button>
      </fieldset>
      <br></br>
      <fieldset>
        <legend>Set Data dg merge: true </legend>
        <label htmlFor="kolom3">Kolom3 :</label>
        <input
          style={{ marginLeft: "1em" }}
          type="text"
          name="kolom3"
          placeholder="Isi Kolom3"
          onChange={(e) => setKolom3(e.target.value)}
        />
        <br></br>
        <br></br>
        <button onClick={onSimpanDokDgIdMerge}>SIMPAN DOK DG ID MERGE</button>
      </fieldset>
      <br></br>
      <fieldset>
        <legend>Keterangan</legend>
        Dokumen ID : {docId}
      </fieldset>
    </div>
  );
}

export default Latihan2;
