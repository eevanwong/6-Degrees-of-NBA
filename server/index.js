const express = require('express');

const PORT = process.env.PORT || 3001;

const app = express()

app.listen(PORT, () => {
    console.log('listening')
}) 

app.get('/', (req,res) => {
    res.json({message:"welcome"})
})

app.get("/getPlayers", (req,res) => {
    res.json({message:"Yooooo"})
})
