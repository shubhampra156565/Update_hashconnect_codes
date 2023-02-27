import { HashConnect } from "hashconnect";
// const  { TokenCreateTransaction, Client, TokenType, TokenInfoQuery, Hbar, PublicKey, TransferTransaction, AccountCreateTransaction, AccountBalanceQuery, PrivateKey, Wallet,AccountId } = require ( "@hashgraph/sdk");


// const { Buffer } = require("node:buffer");
let hashconnect = new HashConnect();
export const tokensell = async ()=>{
    console.log('hi form the token buy');
    
    
    const r = window.localStorage.hashconnectData;
    const hashconnectSaveData = JSON.parse(r);
    console.log(hashconnectSaveData);
    console.log(hashconnectSaveData.topic)
    console.log(hashconnectSaveData.pairingData[0]);
    // const c = hashconnectSaveData.pairingData[0];
    const accountid = hashconnectSaveData.pairingData[0].accountIds[0]
    const topic1 = hashconnectSaveData.pairingData[0].topic;
    const ekey = hashconnectSaveData.encryptionKey;
    console.log(topic1);
    console.log(accountid);
    console.log('my e key is this one '+ekey);
    
    
        const sellingtnx = { token : "0.0.343556",
                             amount : 1,
                            acc : accountid};
    
        const tnx = await fetch('http://localhost:8080/sell',{
            method:"POST",
            mode:"cors",
            headers:{ 
                'Content-type':'application/json'
            },
            body: JSON.stringify(sellingtnx)
        });
    
        const signedtnxbytes = await tnx.json();
    
    const transaction = {
        topic: topic1,
        byteArray: signedtnxbytes,
        metadata: {
            accountToSign: accountid,
            returnTransaction: false,
            hideNft: false
        }
    }
    const {response} = await hashconnect.sendTransaction(topic1, transaction);

    console.log(response)
    // return {status :response.success };
    return('singed response is recived back')
    
    
};
