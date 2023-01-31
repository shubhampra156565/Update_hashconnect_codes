const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const fetch = require("node-fetch");

const {sendAuth, recieveAuth} =require('./auth.js');
// const port = process.env.port;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.get('/',(req,res)=>{
    res.send('server is live')
});

app.get('/authenticate',(req,res)=>{
    const signingData = sendAuth();
    res.send({signingData});
})

app.post('/recieveAuth',(req,res)=>{
    const data = req.body;
    const {signingAccount, auth} = data 
    const authMsg = recieveAuth(signingAccount,auth)
    res.send({authMsg});
});


app.listen(8080,()=>{
    console.log(`listenig to the port 8080`)
});


