const express = require("express");
const app = express();

app.listen(4000, console.log("App is listening at PORT 4000"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("home");
});
