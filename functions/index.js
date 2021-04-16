//functions/index.js
const functions = require("firebase-functions");
const express = require("express");
const app = express();
//admin.js
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

app.get("/", (req, res) => {
  res.status(200).send("Hello PETIRS");
});

const getAllCustomers = (request, response) => {
  customers = [
    {
      id: "1",
      name: "Edy",
      address: "Semarang",
    },
    {
      id: "2",
      title: "Isnanto",
      body: "Purwokerto",
    },
  ];
  return response.json(customers);
};

app.get("/customers", getAllCustomers);

const getAllKoleksi = (request, response) => {
  db.collection("koleksi1")
    //.orderBy('createdAt')
    .get()
    .then((data) => {
      let colections = [];
      data.forEach((doc) => {
        colections.push({
          docId: doc.id,
          kolom1: doc.data().kolom1,
          kolom2: doc.data().kolom2,
        });
      });
      return response.json(colections);
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};
app.get("/koleksi", getAllKoleksi);

exports.app = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
