const express = require("express");
const port = process.env.PORT || 4000;
const app = express();
const cors = require("cors");
const corsMiddleware = cors();
const Parser = express.json();
const userRouter = require("./user/router");
const db = require("./db");
//Routers
const imageRouter = require("./image/router");
const loginRouter = require("./auth/router");

app.use(corsMiddleware);
app.use(Parser);
app.use(imageRouter);
app.use(loginRouter);
app.use(userRouter);
app.listen(port, () => console.log(`Listening on :${port}`));
