import express from "express";
import process from "node:process";
import bodyParser from "body-parser";
import fs from "node:fs";
import cors from "cors";
import {
  addSynonyms,
  getSynonymsGroup,
  getAllSynonyms,
  editSynonyms,
} from "./services/services";

const app = express();

const allowedOrigins = ["http://localhost:3000"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

// Then pass these options to cors:
app.use(cors(options));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/api/synonyms/all", async (req, res) => {
  const synonymsStorage = await getAllSynonyms();
  res.send(synonymsStorage);
});

app.get("/api/synonyms", async (req, res) => {
  let { search: word } = req.query;
  word = String(word);
  const synonymsGroup = await getSynonymsGroup(word);

  res.send(synonymsGroup);
});

app.post("/api/synonyms", async (req, res, next) => {
  const { word } = req.body;
  if (typeof word !== "undefined") {
    next();
  } else if (Array.isArray(req.body)) {
    const synonymsStorage = await addSynonyms(req.body);
    if (synonymsStorage.status === "error") {
      res.status(400).json({ msg: synonymsStorage.msg });
    }
    res.send(synonymsStorage);
  } else {
    res.status(400).json({ msg: "error wrong post body" });
  }
});

app.post("/api/synonyms", async (req, res, next) => {
  const word = req.body.word;
  const synonymsList = req.body.synonymsList;
  const result = await editSynonyms(word, synonymsList);
  if (result.status === "error") {
    res.status(400).json(result);
  }
  res.status(200).json(result);
});

app.get("/", async (req, res) => {
  return res.status(200).json({ message: "synonyms server is started" });
});

const server = app.listen(5000, () => {
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

export default server;
