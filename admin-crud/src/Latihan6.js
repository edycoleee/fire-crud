//src/Latihan6.js
import React, { useState } from "react";
//import firebase
import { db, Firebase } from "./firebase";

//setting ini jika menggunakan emulator firestore
//comment jika mau langsung koneksi ke cloud firebase
//settings({ host: "localhost:8080", ssl: false });

function Latihan6() {
  //state untuk add data
  const [nmCollection, setNmCollection] = useState("");
  const [kolom1, setKolom1] = useState("");
  const [kolom2, setKolom2] = useState("");
  const [kolom3, setKolom3] = useState("");

  //state untuk data dari hasil pembacaan
  const [dataCollection, setDataCollection] = useState([]);

  //state untuk edit data
  const [edtnmDokumen, setEdtNmDokumen] = useState("");

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
        getAllCol();
        setKolom1("");
        setKolom2("");
        console.log("Added doc with ID : ", doc.id);
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }

  function onSimpanDokDgIdMerge() {
    if (nmCollection === "") return console.log("Nama Koleksi Kosong");
    if (edtnmDokumen === "") return console.log("Nama Dokumen Kosong");
    if (kolom3 === "") return console.log("Kolom3 Kosong");
    console.log(nmCollection, edtnmDokumen, kolom1, kolom2);
    db.collection(nmCollection)
      .doc(edtnmDokumen)
      .set(
        {
          kolom3: kolom3,
        },
        { merge: true }
      )
      .then(() => {
        getAllCol();
        console.log("Document successfully written!");
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

  //button mengambil data yang akan di edit
  function onEditDok(row) {
    console.log("Edit Dok :", row);
    //memasukkan data kedalam state edit
    setEdtNmDokumen(row.id);
  }

  //button utk delete data
  function onDeleteDok(id_del) {
    console.log("Delete id dok :", id_del);
  }

  //button utk delete field
  function onDeleteField() {
    console.log("Delete kolom3 dalam dok :", edtnmDokumen);
    if (nmCollection === "") return console.log("Nama Koleksi Kosong");
    if (!edtnmDokumen) return console.log("Nama Dokumen Kosong");
    console.log(nmCollection, edtnmDokumen);
    db.collection(nmCollection)
      .doc(edtnmDokumen)
      .update({
        kolom3: Firebase.firestore.FieldValue.delete(),
      })
      .then(() => {
        getAllCol();
        setKolom3("");
        console.log("Deleted doc ");
      })
      .catch((error) => {
        console.error("Error update document: ", error);
      });
  }

  //button utk lihat jam server
  function onAddTime() {
    db.collection(nmCollection)
      .doc(edtnmDokumen)
      .set(
        {
          createdAt: Firebase.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      )
      .then(() => {
        getAllCol();
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }

  function onConversiTime(timestamp) {
    if (!timestamp) return console.log("kosong");
    console.log(timestamp, timestamp.seconds, timestamp.nanoseconds);
    const newDate = new Date(
      timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
    );
    return console.log(newDate);
  }
  return (
    <div>
      <h3>Latihan 6 Latihan Add Delete KOlom dalam Dok</h3>
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
                <td>{JSON.stringify(row.createdAt)}</td>
                <td>
                  <button onClick={() => onConversiTime(row.createdAt)}>
                    WAKTU
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </fieldset>
      {/* -------------------Kolom data------------------------- */}
      <br></br>
      <fieldset>
        <legend>
          Add / Delete Field Data inside dokumen {edtnmDokumen || "Kosong"}{" "}
        </legend>
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
        <button onClick={onSimpanDokDgIdMerge}>ADD FIELD Kolom3</button>{" "}
        <button onClick={onDeleteField}>DELETE FIELD Kolom3</button>
        <br></br>
        <br></br>
        <button onClick={onAddTime}>Add Jam Server CreatedAt</button>
      </fieldset>
      <br></br>
      <br></br>
      <fieldset>
        <legend>Data Firestore </legend>
        {JSON.stringify(dataCollection)}
      </fieldset>
    </div>
  );
}

export default Latihan6;
