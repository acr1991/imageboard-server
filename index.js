const express = require("express");
const port = process.env.PORT || 4000;
const app = express();
const db = require("./db");

app.listen(port, () => console.log(`Listening on :${port}`));
