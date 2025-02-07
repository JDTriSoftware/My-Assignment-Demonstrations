//"StAuth10244: I Justin Triantafilou, 000775460 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else."

const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");
const solveCorsError = require('cors');
const express = require('express');
const artApp = express();

artApp.use(express.json());
artApp.use(solveCorsError());

artApp.get("/api", async function (req, res) {
  console.log("GET COLLECTION REQUEST RECEIVED");
  const artCollection =
    await db.all("SELECT Collection_Id as id, item, location, on_loan, worth FROM Collection");
  console.log(JSON.stringify(artCollection));
  res.json(artCollection);
});


artApp.put("/api", async function (req, res) {
  const submissions = req.body;
  await db.run("DELETE FROM Collection");
  for (let submission of submissions) {
    await db.run(
      "INSERT INTO Collection (item, location, on_loan, worth) VALUES (?, ?, ?, ?)",
      [submission.item, submission.location, submission.on_loan, submission.worth]
    );
  }
  res.json({ status: "REPLACE COLLECTION SUCCESSFUL" });
});



artApp.post("/api", async function (req, res) {
  const { item, location, on_loan, worth } = req.body;
  try {
    await db.run(
      "INSERT INTO Collection (item, location, on_loan, worth) VALUES (?, ?, ?, ?)",
      [item, location, on_loan, worth]
    );
    res.json({ status: "CREATE ENTRY SUCCESSFUL" });
  } catch (error) {
    console.error(error);
  }
});


artApp.delete("/api", async function (req, res) {
  console.log("DELETE ALL ART REQUEST RECEIVED");
  const delCollection = await db.run("DELETE FROM Collection");
  console.log(JSON.stringify(delCollection));
  res.json({ status: "DELETE COLLECTION SUCCESSFUL" });
});

artApp.get("/api/:id", async function (req, res) {
  console.log("GET ART ITEM REQUEST RECEIVED");
  const singe_art =
    await db.get("SELECT Collection_Id as id, item, location, on_loan, worth FROM Collection WHERE collection_id = ?", [req.params.id]);
  console.log(JSON.stringify(singe_art));
  res.json(singe_art);
});


artApp.delete("/api/:id", async function (req, res) {
  console.log("GET ART ITEM REQUEST RECEIVED");
  const deleted_art =
    await db.run("DELETE FROM Collection WHERE collection_id = ?",
      [req.params.id]);
  console.log(JSON.stringify(deleted_art));
  res.json({ status: "DELETE ITEM SUCCESSFUL" });
});

async function startup() {
  db = await sqlite.open({
    filename: 'database.db',
    driver: sqlite3.Database
  });

  await db.run("DROP TABLE IF EXISTS Collection");
  await db.run("CREATE TABLE Collection (Collection_Id INTEGER PRIMARY KEY, item TEXT, location TEXT, on_loan INTEGER, worth INTEGER)");

  var stmt = await db.prepare("INSERT INTO Collection (item, location, on_loan, worth) VALUES (?,?,?,?)");
  await stmt.run("Mona Lisa", "Louvre", 0, 850000000);
  await stmt.run("Statue of David", "Galleria", 1, 200000000);
  await stmt.run("Night Watch", "Rijksmusem", 0, 500000000);
  stmt.finalize();

  // start the server
  const server = artApp.listen(3001, function () {
    console.log("RESTful API listening on port 3001!")
  });
}

startup();
