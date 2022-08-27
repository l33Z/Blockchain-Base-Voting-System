const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
var cookieParser = require("cookie-parser");
require("./config/DbConnection");
const candidateRouter = require("./router/candidateRouter");
const voterRouter = require("./router/voterRouter");
const adminRouter = require("./router/adminRouter");


app.use(cors());
app.use(cookieParser());

app.use(voterRouter);
app.use(candidateRouter);
app.use(adminRouter);


app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello worlD!");
});

app.listen(PORT, (err, res) => {
  console.log("listening on port " + PORT);
});
