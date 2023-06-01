const express = require("express");
const app = express();
const axios = require("axios");
const covid = require("./covid.json");

app.use(express.json());

app.get("/", (req, res) => {
  let results = [];
  for (let i = 0; i < covid.length; i++) {
    let country = {
      name: covid[i].name,
      cases: covid[i].latest_data.confirmed,
      deaths: covid[i].latest_data.deaths,
      recovered: covid[i].latest_data.recovered,
    };

    results.push(country);
  }

  res.json(results);
});

app.post("/by-country", (req, res) => {
  const pays = req.body.country;
  //console.log(pays);
  let country = covid.find((element) => element.name === pays);
  let resultCountry = {
    name: country.name,
    cases: country.latest_data.confirmed,
    deaths: country.latest_data.deaths,
    recovered: country.latest_data.recovered,
  };
  //   country = {
  //     name: covid.name,
  //     cases: covid.latest_data.confirmed,
  //     deaths: covid.latest_data.deaths,
  //     recovered: covid.latest_data.recovered,

  //   };
  res.json(resultCountry);
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "error" });
});

app.listen(3000, () => {
  console.log("Server started");
});
