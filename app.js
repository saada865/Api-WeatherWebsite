//This is to check

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res){

  const query = req.body.cityName;

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=e49bbd4a849a514ad292ae252de9bc7b&units=metric";
    https.get(url, function(response){

      console.log(response.statusCode);

      response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp
        const description = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon
        const url = "http://openweathermap.org/img/wn/" + icon + ".png";
        res.write("<p>" + description + "</p>");
        res.write("<img src=" + url + ">");
        res.write("<h1>" + "Temperature in " + query + " is: " + temp + " </h1>");
      })
    })

})

app.listen(3000, function(){
  console.log("Server is running");
});
