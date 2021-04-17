//src/Latihan5.js
import React, { useState } from "react";
//import firebase
import { db } from "./firebase";

//setting ini jika menggunakan emulator firestore
//comment jika mau langsung koneksi ke cloud firebase
//settings({ host: "localhost:8080", ssl: false });

function Latihan5() {
  //state untuk add data
  const [nmCollection, setNmCollection] = useState("");
  const [nmDokumen, setNmDokumen] = useState("");
  const [kolom1, setKolom1] = useState("");
  const [kolom2, setKolom2] = useState("");

  //state untuk data dari hasil pembacaan
  const [dataCollection, setDataCollection] = useState([]);

  //state untuk edit data
  const [edtnmDokumen, setEdtNmDokumen] = useState("");
  const [edtkolom1, setEdtKolom1] = useState("");
  const [edtkolom2, setEdtKolom2] = useState("");

  //button simpan fuction simpan dokumen dg id (SET)
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

  //button simpan fuction simpan dokumen auto id (ADD)
  function onSimpanDok() {
    if (nmCollection === "") return console.log("Nama Koleksi Kosong");
    if (kolom1 === "") return console.log("Kolom1 Kosong");
    if (kolom2 === "") return console.log("Kolom2 Kosong");
    console.log(nmCollection, kolom1, kolom2);
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

  //button membaca semua data dari collection
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

  //button membaca semua data dari dokumen dalam collection
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

  //button mengambil data yang akan di edit
  function onEditDok(row) {
    console.log("Edit Dok :", row);
    //memasukkan data kedalam state edit
    setEdtNmDokumen(row.id);
    setEdtKolom1(row.kolom1);
    setEdtKolom2(row.kolom2);
  }

  //button simpan edit
  function onSimpanEdit() {
    if (nmCollection === "") return console.log("Nama Koleksi Kosong");
    if (edtnmDokumen === "") return console.log("Nama Dokumen Kosong");
    if (edtkolom1 === "") return console.log("Kolom1 Kosong");
    if (edtkolom2 === "") return console.log("Kolom2 Kosong");
    console.log(nmCollection, edtnmDokumen, edtkolom1, edtkolom2);
    db.collection(nmCollection)
      .doc(edtnmDokumen)
      .update({
        kolom1: edtkolom1,
        kolom2: edtkolom2,
      })
      .then(() => {
        console.log("Updated doc ");
      })
      .catch((error) => {
        console.error("Error update document: ", error);
      });
  }
  //button utk delte data
  function onDeleteDok(id_del) {
    console.log("Delete id dok :", id_del);
    if (nmCollection === "") return console.log("Nama Koleksi Kosong");
    if (!id_del) return console.log("Nama Dokumen Kosong");
    console.log(nmCollection, id_del);
    db.collection(nmCollection)
      .doc(id_del)
      .delete()
      .then(() => {
        console.log("Deleted doc ");
      })
      .catch((error) => {
        console.error("Error update document: ", error);
      });
  }

  return (
    <div>
      <h3>Latihan 5 Menampilkan Edit Data</h3>
      {/* -------------------add data------------------------- */}
      <fieldset>
        <legend>Add Data :</legend>
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
      {/* -------------------table data------------------------- */}
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
      {/* -------------------edit data------------------------- */}
      <fieldset>
        <legend>Edit Data :</legend>
        <p>Nama Collection : {nmCollection || "Kosong"}</p>
        <p>Nama Dokumen : {edtnmDokumen || "Kosong"}</p>
        <label htmlFor="kolom1">Kolom1 :</label>
        <input
          style={{ marginLeft: "1em" }}
          type="text"
          name="kolom1"
          value={edtkolom1 || ""}
          onChange={(e) => setEdtKolom1(e.target.value)}
        />
        <br></br>
        <br></br>
        <label htmlFor="kolom2">Kolom2 :</label>
        <input
          style={{ marginLeft: "1em" }}
          type="text"
          name="kolom2"
          value={edtkolom2 || ""}
          onChange={(e) => setEdtKolom2(e.target.value)}
        />
        <br></br>
        <br></br>
        <button onClick={onSimpanEdit}>UPDATE </button>{" "}
        <button onClick={getAllCol}>LIHAT COLL</button>
      </fieldset>
    </div>
  );
}

export default Latihan5;
