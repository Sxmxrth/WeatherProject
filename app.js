const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html");

})

app.post("/", function(req, res){

    var city = req.body.cityName;
    const apiKey = "0e0af9c08b4816d2c7bbcedf0f325738";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + units ;

    https.get(url, function(response){
        //console.log(response.statusCode);

        response.on("data", function(data){

            const weatherData = JSON.parse(data);
            //console.log(weatherData);
            const temp = weatherData.main.temp;
            //console.log(temp);
            const weather = weatherData.weather[0].description;

            const id = weatherData.weather[0].id;
            const icon = weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<h1>The temperature in " + city + " is " + temp + " degrees celcius</h1>");
            res.write("<p>The weather in " + city + " is " + weather);

            res.write("<img src =" + imgURL + ">")
            res.send();

        })
    })

})


app.listen(3000, function(){
    console.log("The server is running on port 3000.");
})