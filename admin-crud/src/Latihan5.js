//src/Latihan5.js
import React, { useState } from "react";
//import firebase
import { db } from "./firebase";

//setting ini jika menggunakan emulator firestore
//comment jika mau langsung koneksi ke cloud firebase
//settings({ host: "localhost:8080", ssl: false });

function Latihan5() {
  //state
  const [nmCollection, setNmCollection] = useState("");
  const [nmDokumen, setNmDokumen] = useState("");
  const [kolom1, setKolom1] = useState("");
  const [kolom2, setKolom2] = useState("");

  //state untuk data dari hasil pembacaan
  const [dataCollection, setDataCollection] = useState([]);

  //button simpan fuction
  function onSimpanDokDgId() {
    if (nmCollection === "") return console.log("Nama Koleksi Kosong");
    if (nmDokumen === "") return console.log("Nama Dokumen Kosong");
    if (kolom1 === "") return console.log("Kolom1 Kosong");
    if (kolom2 === "") return console.log("Kolom2 Kosong");
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

  function onSimpanDok() {
    if (nmCollection === "") return console.log("Nama Koleksi Kosong");
    if (kolom1 === "") return console.log("Kolom1 Kosong");
    if (kolom2 === "") return console.log("Kolom2 Kosong");
    console.log(nmCollection, kolom1, kolom2);
    // Add a new document in collection "cities"
    db.collection(nmCollection)
      .add({
        kolom1: kolom1,
        kolom2: kolom2,
      })
      .then((doc) => {
        console.log("Added doc with ID : ", doc.id);
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }

  const getAllCol = () => {
    if (nmCollection === "") return console.log("Nama Koleksi Kosong");
    console.log("Get Once All Data Collection", nmCollection);
    db.collection(nmCollection)
      .get()
      .then((firecol) => {
        const data = firecol.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Get All Data Collection :", data);
        setDataCollection(data);
      })
      .catch((error) => console.error("Error Get Data :", error));
  };

  const getDok = () => {
    if (nmCollection === "") return console.log("Nama Koleksi Kosong");
    if (nmDokumen === "") return console.log("Nama Dokumen Kosong");
    console.log("Get Dokumen", nmCollection);
    db.collection(nmCollection)
      .doc(nmDokumen)
      .get()
      .then((doc) => {
        if (!doc.exists) return console.log("No such document!");
        return setDataCollection([{ id: doc.id, ...doc.data() }]);
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  };

  function onEditDok(row) {
    console.log("Edit Dok :", row);
  }

  function onDeleteDok(id_del) {
    console.log("Delete id dok :", id_del);
  }

  return (
    <div>
      <h3>Latihan 5 Menampilkan Edit Data</h3>
      <fieldset>
        <legend>Set Data :</legend>
        <label htmlFor="nmCollection">Nama Collection :</label>
        <input
          style={{ marginLeft: "1em" }}
          type="text"
          name="nmCollection"
          placeholder="Isi Nama Collection"
          onChange={(e) => setNmCollection(e.target.value)}
        />{" "}
        <button onClick={getAllCol}>LIHAT COLL</button>
        <br></br>
        <br></br>
        <label htmlFor="nmDokumen">Nama Dokumen :</label>
        <input
          style={{ marginLeft: "1em" }}
          type="text"
          name="nmDokumen"
          placeholder="Isi Kolom1"
          onChange={(e) => setNmDokumen(e.target.value)}
        />{" "}
        <button onClick={getDok}>LIHAT DOK</button>
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
        <button onClick={onSimpanDokDgId}>SIMPAN DOK DG ID</button>{" "}
        <button onClick={onSimpanDok}>SIMPAN DOK</button>
      </fieldset>
      <fieldset>
        <legend>Data Firestore </legend>
        {JSON.stringify(dataCollection)}
      </fieldset>
      <fieldset>
        <legend>Table Firestore </legend>
        <table>
          <thead>
            <tr>
              <th>kolom 1</th>
              <th>kolom 2</th>
              <th>kolom 3</th>
              <th>EDIT</th>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {dataCollection?.map((row) => (
              <tr key={row.id} style={{ height: "2em" }}>
                <td>{row.kolom1}</td>
                <td>{row.kolom2}</td>
                <td>{row.kolom3}</td>
                <td>
                  <button onClick={() => onEditDok(row)}>EDIT</button>
                </td>
                <td>
                  <button onClick={() => onDeleteDok(row.id)}>DELETE</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </fieldset>
    </div>
  );
}

export default Latihan5;
