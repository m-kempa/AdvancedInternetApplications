
const request = require("request");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const url = "https://carbuzz.com/cars/v8-sedans";
//const url = "https://carbuzz.com/cars/above-300k"

let resultList = []




console.log("--------Unit Price of one Horsepower in cars----------")
  request(`${url}`, (error, response, body) => {
    if (error) {
      console.log("Error occured: ", error);
      process.exit(1);
    }

    console.log(response.statusCode);

    const document = new JSDOM(body).window.document;
    const names = document.querySelectorAll("a.bg-group-car-preview__name");
    const prices = document.querySelectorAll("div.sub-model-preview-field.sub-model-preview-field_price div.sub-model-preview-field__val");
    const horse_power = document.querySelectorAll("div.sub-model-preview-field.sub-model-preview-field_horsepower div.sub-model-preview-field__val");
    //console.log("Names: ", names.length);
    //console.log("Prices: ", prizes.length);
    //console.log("HP: ",horse_power.length);
    if (names.length !== prices.length) {
      console.log("Something went wrong, fetched wrong amount of data...");
      process.exit(1);
    }
    for (let i = 0; i < names.length; i++) {
      resultList.push({
        Car_Name: names[i].innerHTML,
        price_in_Dollars: prices[i].innerHTML.split("-")[0].split(",").join("").replace("$",""),
        Horse_Power: horse_power[i].innerHTML.split(" hp")[0].replace(",",""),
        Unit_Price: prices[i].innerHTML.split("-")[0].split(",").join("").replace("$","") / horse_power[i].innerHTML.split(" hp")[0].replace(",","")
      });
    }

    resultList.sort(function (a, b) {
      return a.Unit_Price - b.Unit_Price ;
    })
    console.log(resultList);
    console.log(resultList.length);
  });
  


