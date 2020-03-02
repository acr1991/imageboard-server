const express = require("express");
const port = process.env.PORT || 4000;
const app = express();
const cors = require("cors");
const corsMiddleware = cors();
const db = require("./db");
const Parser = express.json();
const imageRouter = require("../image/router");

app.use(Parser);
app.use(imageRouter);
app.use(corsMiddleware);
//app.use(parserMiddleware);

app.listen(port, () => console.log(`Listening on :${port}`));
