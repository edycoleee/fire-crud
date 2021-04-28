//LATIHAN QRGENERATOR QRSCANNER
import React, { useState } from "react";
import QRcode from "qrcode.react";
import QrScan from "react-qr-reader";

function Latihan2() {
  const [scan, setScan] = useState(false);
  return (
    <div>
      <QRgenerator />
      <br></br>
      <button onClick={() => setScan(true)}>SCAN OPEN</button>
      <button onClick={() => setScan(false)}>SCAN CLOSE</button>
      {scan && <QRscanner />}
    </div>
  );
}

export default Latihan2;

function QRgenerator() {
  const [qr, setQr] = useState("mencoba qr");
  const handleChange = (event) => {
    setQr(event.target.value);
  };
  const downloadQR = () => {
    const canvas = document.getElementById("myqr");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "myqr.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div>
      <span>QR Generator</span>
      <div style={{ marginTop: 30 }}>
        <input
          type="text"
          value={qr}
          onChange={handleChange}
          style={{ width: 320 }}
        ></input>
      </div>

      <div>
        {qr ? (
          <QRcode id="myqr" value={qr} size={320} includeMargin={true} />
        ) : (
          <p>No QR code preview</p>
        )}
      </div>
      <div>
        {qr ? (
          <>
            <input
              type="text"
              defaultValue={qr}
              value={qr}
              style={{ fontSize: 18, width: 250, height: 100 }}
            />
            <button onClick={downloadQR}>download</button>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

function QRscanner() {
  const [qrscan, setQrscan] = useState("No result");
  const handleScan = (data) => {
    if (data) {
      setQrscan(data);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div>
      <span>QR Scanner</span>
      <center>
        <div style={{ marginTop: 30 }}>
          <QrScan
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ height: 240, width: 320 }}
          />
        </div>
      </center>
      <input
        type="text"
        defaultValue={qrscan}
        value={qrscan}
        style={{ fontSize: 18, width: 320, height: 100, marginTop: 100 }}
      />
    </div>
  );
}
