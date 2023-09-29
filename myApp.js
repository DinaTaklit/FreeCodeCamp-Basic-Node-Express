let express = require("express");
let app = express();
require("dotenv").config();

console.log("Hello World");

app.use("/public", express.static(`${__dirname}/public`));

app.use((req, res) => {
  const log = `${req.method} /${req.path} - ${req.ip}`;
  console.log(log);
  next();
});

app.get("/json", (req, res) => {
  if (process.env["MESSAGE_STYLE"] === "uppercase") {
    res.json({ message: "HELLO JSON" });
  } else {
    res.json({ message: "Hello json" });
  }
});

app.get("/", (req, res) => {
  //   res.send("Hello Express");
  const absolutePath = `${__dirname}/views/index.html`;
  res.sendFile(absolutePath);
});

module.exports = app;
