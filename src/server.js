const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { port } = require("./config");
const { cars } = require("./db/db");
const { data } = require("./db/cao");
const { request } = require("express");
const app = express();

//Middleware
app.use(cors());
app.use(morgan("dev"));

//CAO 1 UZD - GET CAR MODELS
app.get("/cars/:model", (request, response) => {
  const brand = request.params.model;
  //   console.log("brand===", brand);
  response.json(cars[brand]);
});

//CAO 2.1 Sukurkite bendrinį GET route, kuris paduos visus duomenis.
app.get("/", (request, response) => {
  response.json(data);
});

//CAO 2.2 Sukurkite dinaminį GET route, kur URL turės automobilio markę ir pagal ją prafiltruos, ir grąžins tik tuos žmones, kurie turi šį automobilį.
app.get("/:brand", (request, response) => {
  const owners = request.params.brand;
  //   console.log("brand===", brand);
  response.json(data.filter((user) => user.car === owners));
});

//CAO 2.3 Sukurkite dinaminį GET route, kuris priims vartotojo id ir pagal jį grąžins atitinkamą vartotojo objektą. Hint: url parametrai visada stringai, o čia id - skaičius, tad reikės konvertuoti.
app.get("/data/:postId", (request, response) => {
  const postId = +request.params.postId;
  console.log("postId===", postId);
  const foundPost = data.find((postObj) => postObj.id === postId);
  console.log("foundPost===", foundPost);
  if (foundPost === undefined) {
    response.status(404).json("Post not found");
    return;
  }
  response.json(foundPost);
});

//CAO 2.4 Sukurkite GET route, kuris grąžins visus el. paštus (grąžinamas formatas: ["anb@abc.com", "abc@abc.com", "abc@acb.com]).
app.get("/data/users/emails", (request, response) => {
  const emailEl = data.map((el) => {
    return el.email;
  });
  console.log("emailEl===", emailEl);
  response.json(emailEl);
});

//CAO 2.5 Sukurkite GET route, į kurį pasikreipus, grąžins visų moterų (gender: Female) vardą ir pavardę (formatas: ["Rita Kazlauskaite", "Monika Simaskaite"]).
app.get("/data/users/females", (request, response) => {
  const femaleNames = data.filter((obj) => obj.gender === "Female").map((obj) => obj.first_name + " " + obj.last_name);
  response.json(femaleNames);
});

//____________________________________________________________//
app.listen(port, () => console.log("express is online", port));
