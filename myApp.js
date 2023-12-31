let express = require("express");
const bodyParser = require("body-parser");
let app = express();
require("dotenv").config();

console.log("Hello World");

app.use("/public", express.static(`${__dirname}/public`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res) => {
  const log = `${req.method} /${req.path} - ${req.ip}`;
  console.log(log);
  next();
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({
      time: req.time,
    });
  }
);

app.post("/name", (req, res) => {
  const firstName = req.body.first;
  const lastName = req.body.last;
  const name = `${firstName} ${lastName}`;
  res.json({
    name,
  });
});

app.get("/name", (req, res) => {
  const firstName = req.query.first;
  const lastName = req.query.last;
  const name = `${firstName} ${lastName}`;
  res.json({
    name,
  });
});

app.get("/:word/echo", (req, res) => {
  const word = req.params.word;
  res.json({
    echo: word,
  });
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
