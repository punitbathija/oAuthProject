const express = require("express");
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const app = express();
require("./passport/passport");

mongoose.connect("mongodb://127.0.0.1:27017/passport", () => {
  mongoose.set("strictQuery", false);
  console.log("DB Connected");
});

app.listen(4000, console.log("App is listening at PORT 4000"));

app.set("view engine", "ejs");
app.use("/auth", auth);

app.get("/", (req, res) => {
  res.render("home");
});
