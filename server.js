var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({optionSuccessStatus: 200})); 
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/timestamp", (req, res) => {
  let currentDate = new Date()
  res.json({"unix": currentDate.getTime(), utc: currentDate.toUTCString()})
})

app.get("/api/timestamp/:date_string?", (req, res) => {
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
  res.json(response); 
  // next();
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});