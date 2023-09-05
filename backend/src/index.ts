import express from "express";
import process from "node:process";
import fs from "node:fs";

const app = express();
app.get("/", (req, res) => res.send("server is running fast and faster..."));

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
