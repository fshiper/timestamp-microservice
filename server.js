const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});
app.get("/api/timestamp", (req, res, next) => {
  let currentDate = new Date()
  res.send({"unix": currentDate.getTime(), utc: currentDate.toUTCString()})
  next()
})

app.get("/api/timestamp/:date_string?", (req, res, next) => {
  let reqDate = req.params.date_string;
  let resDate = new Date()
  let response = {}
  if (new Date(reqDate)=="Invalid Date" && new Date(reqDate*1000)=="Invalid Date") {
    response = {"error" : "Invalid Date" };
  } else {
    isNaN(+reqDate)?
      resDate = new Date(reqDate)
      :resDate = new Date(reqDate*1);
    response = {"unix": resDate.getTime(), utc: resDate.toUTCString()};
  }
  console.log(response)
  res.send(response); 
  next();
})

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
