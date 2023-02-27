const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const fetch = require("node-fetch");
const {tokentransfer} = require("./tokentransger");
const {Associatetoken,executetokenAss} = require('./tokneAsstobytes');

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
});

app.post('/recieveAuth',(req,res)=>{
    const data = req.body;
    const {signingAccount, auth} = data 
    const authMsg = recieveAuth(signingAccount,auth)
    res.send({authMsg});
});

app.post('/sell',(req,res)=>{
    const data  = req.body;
    const{token,amount,acc}=data 
     const tnx = tokentransfer(token,amount,acc);
    res.send({tnx});
});



// this is for get the trasection 
app.post('/associate',async(req,res)=>{
    const data = req.body;
    const {token,acc} = data 
    console.log(data);
    console.log(acc);
    const bytes = await Associatetoken(token,acc);
    res.send(bytes);
    //calling the token creating trasection which retunrn the transecton bytes ;
})


// for exectue associate tnx at server side
app.post('/executeAssociate',(req,res)=>{
    const data = req.body ;
    console.log(data);
    const {bytes,sign,acc} = data ;
    const status = executetokenAss(bytes,sign,acc);
    res.send(status);
});

app.post('/tnx',(req,res)=>{
    const data = req.body ;
    console.log('tnx is going in or out not ideas');
})

app.listen(8080,()=>{
    console.log(`listenig to the port 8080`)
});



