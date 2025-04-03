require("dotenv").config();
const bodyParser = require("body-parser");
let express = require('express');
let app = express();

console.log("Hello World");

app.use(bodyParser.urlencoded({extended: false}))
app.use("/public", express.static(__dirname + "/public"))

app.get("/", (req, res ) => {

    res.sendFile(__dirname + "/views/index.html")
});

// app.get("/json", (req, res ) => {
//     // res.json({"message": "Hello json"});
//     process.env.MESSAGE_STYLE === "uppercase" ? res.json({"message": "HELLO JSON"}): res.json({"message": "Hello json"})
// })

app.get("/json", (req, res, nexT) =>{
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    nexT();
})

app.get("/now", (req, res, next) =>{
    req.time = new Date().toString();
    next();
}, (req, res) => [
    res.json({time: req.time})
])

app.get("/:word/echo", (req, res) =>{
    word = req.params.word
    res.json({echo: word})
})
//http://localhost:3000/freecodecamp/echo

app.route("/name")
.get((req, res) => {
    const firstname = req.query.first;
    const lastname = req.query.last;
    res.json({name: `${firstname} ${lastname}`})
})
.post((req, res) => {
    const {first, last} = req.body;
    res.json({name: `${first} ${last}`});
})



































 module.exports = app;
