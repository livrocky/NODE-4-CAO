const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { port } = require("./config");
const { cars } = require("./db/db");
const app = express();

//Middleware
app.use(cors());
app.use(morgan("dev"));

//CAO 1

app.get("/", (request, response) => {
  response.json("ok");
});

app.get("/cars/:model", (request, response) => {
  const brand = request.params.model;
  //   console.log("brand===", brand);
  response.json(cars[brand]);
});

app.listen(port, () => console.log("express is online", port));
