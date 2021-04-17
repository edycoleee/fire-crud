import React, { useState } from "react";
import { db } from "./firebase";

//setting ini jika menggunakan emulator firestore
//comment jika mau langsung koneksi ke cloud firebase
//settings({ host: "localhost:8080", ssl: false });

const PILIHCARI = ["Nama", "Alamat", "Tanggal", "Makanan", "Sekolah"];
const NMCOLLECTION = "CL_KOLEKSI1";
const PILIHSEKOLAH = ["SD", "SMP", "SMA", "S1"];

function Latihan8({ setStAlert, setDataCollection }) {
  const [statePlhCari, setStatePlhCari] = useState(PILIHCARI[0]);
  const [stCari, setStCari] = useState("");

  const [stateSekolah, setStateSekolah] = useState(PILIHSEKOLAH[0]);
  const pilihanSekolah = PILIHSEKOLAH.map((item, index) => {
    return (
      <option key={index} value={item}>
        {item}
      </option>
    );
  });

  const pilihanCari = PILIHCARI.map((item, index) => {
    return (
      <option key={index} value={item}>
        {item}
      </option>
    );
  });

  function onPilih(e) {
    setStatePlhCari(e.target.value);
    console.log(e.target.value);
    if (e.target.value === "Tanggal") {
      setStCari(new Date().toISOString().slice(0, 10));
    } else {
      setStCari("");
    }
  }

  async function onCari() {
    let fieldCari = "";
    const getCari = async (Cari) =>
      await db
        .collection(NMCOLLECTION)
        .where(fieldCari, "==", Cari)
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

    if (statePlhCari === "Sekolah") {
      fieldCari = "stateSekolah";
      return await getCari(stateSekolah);
    }

    if (stCari === "") return setStAlert("Pencarian Kosong");
    console.log(stCari);

    if (statePlhCari === "Makanan") {
      return await db
        .collection(NMCOLLECTION)
        .where("selectMakanan", "array-contains", stCari)
        .get()
        .then((firecol) => {
          const data = firecol.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log("Get All Data Collection :", data);
          setDataCollection(data);
          if (data.length === 0) setStAlert("Pencarian Kosong");
        })
        .catch((error) => console.error("Error Get Data :", error));
    }

    if (statePlhCari === "Nama") fieldCari = "nmDonatur.nmDepan";
    if (statePlhCari === "Alamat") fieldCari = "almtDonatur";
    if (statePlhCari === "Tanggal") fieldCari = "tglDonasi";
    return await getCari(stCari);
  }

  return (
    <div>
      <fieldset>
        <legend>Filter Data</legend>
        <label>CARI DATA : </label>
        <select
          id="plhSekolah"
          style={{ width: "150px" }}
          onChange={(e) => onPilih(e)}
          value={statePlhCari}
        >
          {pilihanCari}
        </select>
        {statePlhCari === "Sekolah" ? (
          <select
            style={{ width: "150px", marginLeft: "1em" }}
            onChange={(e) => setStateSekolah(e.target.value)}
            value={stateSekolah}
          >
            {pilihanSekolah}
          </select>
        ) : (
          <input
            style={{ marginLeft: "1em" }}
            type="text"
            name="kolom1"
            placeholder="Cari Data"
            onChange={(e) => setStCari(e.target.value)}
            value={stCari || ""}
          />
        )}{" "}
        <button onClick={() => onCari()}>CARI</button>
      </fieldset>
    </div>
  );
}

export default Latihan8;
