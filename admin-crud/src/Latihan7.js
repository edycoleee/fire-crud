import React, { useState, useEffect } from "react";
import { db, Firebase } from "./firebase";

//setting ini jika menggunakan emulator firestore
//comment jika mau langsung koneksi ke cloud firebase
//settings({ host: "localhost:8080", ssl: false });

const DEVELOP = true;
const NMCOLLECTION = "CL_KOLEKSI1";
const PILIHMAKANAN = ["SOTO", "SATE", "NASGOR", "PIZZA"];
const PILIHSEKOLAH = ["SD", "SMP", "SMA", "S1"];
function getCurrentDate(separator = "") {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${year}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${date < 10 ? `0${date}` : `${date}`}`;
}

function Latihan7() {
  const [nmDonatur, setNmDonatur] = useState({
    nmDepan: "",
    nmBelakang: "",
  });
  const [almtDonatur, setAlmtDonatur] = useState("");
  const [jmlDonasi, setJmlDonasi] = useState(0);
  const [tglDonasi, setTglDonasi] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [selectMakanan, setSelectMakanan] = useState([]);
  const [stateSekolah, setStateSekolah] = useState(PILIHSEKOLAH[0]);
  const [incMinum, setIncMinum] = useState(false);
  const [jnsSiswa, setJnsSiswa] = useState("");

  const [stTambah, setStTambah] = useState(false);
  const [stEdit, setStEdit] = useState(false);
  const [stLoading, setStLoading] = useState(false);
  const [stAlert, setStAlert] = useState("");
  const [dataCollection, setDataCollection] = useState([]);
  const [idEdtDok, setIdEdtDok] = useState("");
  const [stDelete, setStDelete] = useState(false);

  const handleChange = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectMakanan(value);
  };

  const pilihanMakanan = PILIHMAKANAN.map((item, index) => {
    return (
      <option key={index} value={item}>
        {item}
      </option>
    );
  });

  const pilihanSekolah = PILIHSEKOLAH.map((item, index) => {
    return (
      <option key={index} value={item}>
        {item}
      </option>
    );
  });

  const getAllCol = async () => {
    await db
      .collection(NMCOLLECTION)
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

  useEffect(() => {
    return getAllCol();
  }, []);

  const onTambah = () => {
    if (DEVELOP) console.log("onTambah");
    setStTambah(true);
    refreshData();
  };

  const onBatal = () => {
    if (DEVELOP) console.log("onBatal");
    setStTambah(false);
    setStEdit(false);
    refreshData();
  };

  const onSimpan = async () => {
    if (DEVELOP) console.log("onSimpan");
    if (nmDonatur.nmDepan === "") return setStAlert("Nama Depan Kosong");
    if (almtDonatur === "") return setStAlert("Alamat Kosong");
    if (jmlDonasi === 0) return setStAlert("Donasi Kosong");
    const newData = {
      nmDonatur,
      almtDonatur,
      jmlDonasi,
      tglDonasi,
      selectMakanan,
      stateSekolah,
      incMinum,
      jnsSiswa,
    };
    if (DEVELOP) console.log(newData);
    setStLoading(true);
    if (stEdit) {
      if (DEVELOP) console.log("onSimpan Edit");
      await db
        .collection(NMCOLLECTION)
        .doc(idEdtDok)
        .update(newData)
        .then(() => {
          console.log("Updated doc ");
        })
        .catch((error) => {
          console.error("Error update document: ", error);
        });
    } else {
      if (DEVELOP) console.log("onSimpan Tambah");

      await db
        .collection(NMCOLLECTION)
        .add(newData)
        .then((doc) => {
          console.log("Added doc with ID : ", doc.id);
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    }
    await getAllCol();
    setStLoading(false);
    setStTambah(false);
    setStEdit(false);
    refreshData();
    setStAlert("Data Telah Tersimpan");
  };

  const onEdit = (data) => {
    if (DEVELOP) console.log("onEdit", data);
    setNmDonatur({
      nmDepan: data.nmDonatur.nmDepan,
      nmBelakang: data.nmDonatur.nmBelakang,
    });
    setIdEdtDok(data.id);
    setAlmtDonatur(data.almtDonatur);
    setJmlDonasi(data.jmlDonasi);
    setTglDonasi(data.tglDonasi);
    setSelectMakanan(data.selectMakanan);
    setStateSekolah(data.stateSekolah);
    setIncMinum(data.incMinum);
    setJnsSiswa(data.jnsSiswa);
    setStAlert("");
    setStTambah(true);
    setStEdit(true);
  };

  const refreshData = () => {
    setNmDonatur({
      nmDepan: "",
      nmBelakang: "",
    });
    setAlmtDonatur("");
    setJmlDonasi(0);
    setTglDonasi(getCurrentDate("-"));
    setSelectMakanan([]);
    setStateSekolah(PILIHSEKOLAH[0]);
    setIncMinum(false);
    setJnsSiswa("");
    setStAlert("");
    setIdEdtDok("");
  };

  const onDelete = async () => {
    setStLoading(true);
    await db
      .collection(NMCOLLECTION)
      .doc(idEdtDok)
      .delete()
      .then(() => {
        console.log("Deleted Data");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
    await getAllCol();
    setStLoading(false);
    setStDelete(false);
    setStAlert("Data Telah Terhapus : ", idEdtDok);
  };

  const onStateDelete = (idDok) => {
    setIdEdtDok(idDok);
    setStDelete(true);
    setStAlert("APAKAH DATA BENAR DIHAPUS ??? :" + idDok + " ");
  };

  const onClearAlert = () => {
    setStAlert("");
    setStDelete(false);
  };

  useEffect(() => {
    const setAsyncTimeout = (cb, timeout = 0) =>
      new Promise((resolve) => {
        setTimeout(() => {
          cb();
          resolve();
        }, timeout);
      });

    const ClearAlert = async () => {
      await setAsyncTimeout(() => {
        onClearAlert();
      }, 5000);
    };

    if (stAlert !== "") return ClearAlert();
  }, [stAlert]);

  if (stLoading) return <>Loading...</>;

  return (
    <div style={{ marginLeft: "3em", maxWidth: "800px" }}>
      <h3>DATA DONASI KITA</h3>
      <br></br>
      <button onClick={() => onTambah()} disabled={stTambah}>
        TAMBAH
      </button>{" "}
      <button onClick={() => onBatal()} disabled={!stTambah}>
        BATAL
      </button>{" "}
      <button onClick={() => onSimpan()} disabled={!stTambah}>
        SIMPAN
      </button>
      <br></br>
      <br></br>
      {stTambah || stEdit ? (
        <fieldset>
          {stEdit ? (
            <legend>EDIT DOKUMEN</legend>
          ) : (
            <legend>TAMBAH DOKUMEN</legend>
          )}
          <label htmlFor="kolom1">Nama :</label>
          <input
            style={{ marginLeft: "1em" }}
            type="text"
            name="kolom1"
            placeholder="Nama Depan"
            onChange={(e) =>
              setNmDonatur({ ...nmDonatur, nmDepan: e.target.value })
            }
            value={nmDonatur?.nmDepan || ""}
          />
          <input
            style={{ marginLeft: "1em" }}
            type="text"
            name="kolom1"
            placeholder="Nama Belakang"
            onChange={(e) =>
              setNmDonatur({ ...nmDonatur, nmBelakang: e.target.value })
            }
            value={nmDonatur?.nmBelakang || ""}
          />
          <br></br>
          <br></br>
          <label htmlFor="alamat">Alamat :</label>
          <textarea
            id="alamat"
            name="alamat"
            rows="2"
            cols="50"
            placeholder="Alamat"
            onChange={(e) => setAlmtDonatur(e.target.value)}
            value={almtDonatur || ""}
          />
          <br></br>
          <br></br>
          <label htmlFor="kolom1">Jml Donasi :</label>
          <input
            style={{ marginLeft: "1em" }}
            type="number"
            name="kolom1"
            placeholder="Isi Kolom1"
            onChange={(e) => setJmlDonasi(e.target.value)}
            value={jmlDonasi || 0}
          />{" "}
          <label htmlFor="kolom1">Tgl Donasi :</label>
          <input
            style={{ marginLeft: "1em" }}
            type="date"
            name="kolom1"
            placeholder="Isi Kolom1"
            onChange={(e) => setTglDonasi(e.target.value)}
            value={tglDonasi}
            //value={stEdit ? tglDonasi : new Date().toISOString().slice(0, 10)}
          />
          <br></br>
          <br></br>
          <label>PILIH MAKANAN : </label>
          <select
            id="select1"
            style={{ width: "150px" }}
            multiple={true}
            onChange={handleChange}
            value={selectMakanan}
          >
            {pilihanMakanan}
          </select>
          <br></br>
          <label>PILIH SEKOLAH : {"  "}</label>
          <select
            id="plhSekolah"
            style={{ width: "150px" }}
            onChange={(e) => setStateSekolah(e.target.value)}
            value={stateSekolah}
          >
            {pilihanSekolah}
          </select>
          <br></br>
          <label>Include Minuman : {"  "}</label>
          <input
            type="checkbox"
            id="minuman"
            name="minuman"
            onChange={(e) => setIncMinum(e.target.checked)}
            checked={incMinum}
          />
          <label htmlFor="vehicle1"> Air</label> {JSON.stringify(incMinum)}
          <br></br>
          <label>Jenis Siswa: {jnsSiswa || ""}</label>
          <div onChange={(e) => setJnsSiswa(e.target.value)}>
            <input type="radio" id="male" name="gender" value="Laki-Laki" />
            <label htmlFor="male">Laki-Laki</label>
            <input type="radio" id="female" name="gender" value="Wanita" />
            <label htmlFor="female">Wanita</label>
            <input type="radio" id="semua" name="gender" value="Semua" />
            <label htmlFor="female">Semua</label>
          </div>
        </fieldset>
      ) : (
        <fieldset>
          <legend>TABLE DATA</legend>
          <table>
            <thead>
              <tr>
                <th>Nama</th>
                <th>Alamat</th>
                <th>Jumlah</th>
                <th>Tgl</th>
                <th>Makanan</th>
                <th>Sekolah</th>
                <th>Minuman</th>
                <th>Jenis</th>
                <th>EDT</th>
                <th>DEL</th>
              </tr>
            </thead>
            <tbody>
              {dataCollection?.map((row) => (
                <tr key={row.id} style={{ height: "2em" }}>
                  <td>
                    {row.nmDonatur.nmDepan} {row.nmDonatur.nmBelakang}
                  </td>
                  <td>{row.almtDonatur}</td>
                  <td>{row.jmlDonasi}</td>
                  <td>{row.tglDonasi}</td>
                  <td>{row.selectMakanan}</td>
                  <td>{row.stateSekolah}</td>
                  <td>{row.incMinum ? "YA" : "TIDAK"}</td>
                  <td>{row.jnsSiswa}</td>
                  <td>
                    <button onClick={() => onEdit(row)}>EDT</button>
                  </td>
                  <td>
                    <button
                      onClick={() => onStateDelete(row.id)}
                      disabled={stDelete}
                    >
                      DEL
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </fieldset>
      )}
      <br></br>
      {stAlert !== "" ? (
        <fieldset style={{ backgroundColor: "#F8DFF1" }}>
          <legend>PERHATIAN</legend>
          {stAlert}{" "}
          <button
            onClick={() => onClearAlert()}
            style={{ backgroundColor: "red" }}
          >
            x
          </button>{" "}
          {stDelete && <button onClick={() => onDelete()}>DEL</button>}
        </fieldset>
      ) : (
        ""
      )}
      {JSON.stringify(tglDonasi)}
      <br></br>
    </div>
  );
}

export default Latihan7;
