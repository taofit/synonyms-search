import express from "express";
import process from "node:process";
import bodyParser from "body-parser";
import fs from "node:fs";
import os from "os";
import { addSynonyms, getSynonymsGroup } from "./services/services";

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/api/synonyms/", async (req, res) => {
  const synonymsGroup = await getSynonymsGroup(req.body.synonyms);
  
  res.send(synonymsGroup);
});

app.post("/api/synonyms", async (req, res) => {
  const synonymsStorage = await addSynonyms(req.body.synonyms);

  res.send(synonymsStorage);
});

app.listen(5000, () => {
  console.log(`server running on port 5001 and see who can access`);
});

process.on("uncaughtException", (err, origin) => {
  fs.writeSync(
    process.stderr.fd,
    `Caught exception: ${err}\n` + `Exception origin: ${origin}`
  );
});

process.on("SIGTERM", (signal): void => {
  console.log(`Received ${signal}`);
});
