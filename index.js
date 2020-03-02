const express = require("express");
const port = process.env.PORT || 4000;
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const imageRouter = require("../image/router");
app.use(jsonParser);
app.use(imageRouter);

app.listen(port, () => console.log(`Listening on :${port}`));
