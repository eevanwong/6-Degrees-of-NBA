const express = require('express');
const bodyParser = require('body-parser')
const mysql = require('mysql');

const PORT = process.env.PORT || 3001;

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));

let con = mysql.createConnection({
    host: process.env.con,
    user: process.env.user,
    password: process.env.pass
  });

app.listen(PORT, () => {
    console.log('listening')
}) 

app.get('/', (req,res) => {
    res.json({message:"welcome"})
})

app.get("/getPlayers", (req,res) => {
    res.json({message:"Yooooo"})
})
