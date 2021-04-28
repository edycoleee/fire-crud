//LATIHAN SIGNATURE PAD
import React, { useState, useRef } from "react";
import SignaturePad from "react-signature-canvas";
//npm install --save react-signature-canvas --legacy-peer-deps

function Latihan3() {
  const [imageURL, setImageURL] = useState(null); // create a state that will contain our image url

  const sigCanvas = useRef({});

  /* a function that uses the canvas ref to clear the canvas 
    via a method given by react-signature-canvas */
  const clear = () => sigCanvas.current.clear();

  /* a function that uses the canvas ref to trim the canvas 
    from white spaces via a method given by react-signature-canvas
    then saves it in our state */
  const save = () =>
    setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));

  return (
    <div className="App">
      <h1>Signature Pad Example</h1>

      <>
        <SignaturePad
          ref={sigCanvas}
          canvasProps={{
            className: "signatureCanvas",
          }}
        />
        {/* Button to trigger save canvas image */}
        <button onClick={save}>Save</button>
        <button onClick={clear}>Clear</button>
      </>

      <br />
      <br />
      {/* if our we have a non-null image url we should 
        show an image and pass our imageURL state to it*/}
      {imageURL ? (
        <img
          src={imageURL}
          alt="my signature"
          style={{
            display: "block",
            margin: "0 auto",
            border: "1px solid black",
            width: "150px",
          }}
        />
      ) : null}
    </div>
  );
}

export default Latihan3;
