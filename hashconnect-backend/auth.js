
const  { TokenCreateTransaction, Client, TokenType, TokenInfoQuery, Hbar, PublicKey, TransferTransaction, AccountCreateTransaction, AccountBalanceQuery, PrivateKey, Wallet,AccountId } = require ( "@hashgraph/sdk");
require('dotenv').config();
const { Buffer } = require("node:buffer");
// const { verify } = require("node:crypto");

const clientPuk= PublicKey.fromString(process.env.A2_pub_key);
const clientPvk = PrivateKey.fromString(process.env.A2_pkey);
const clientID = process.env.A2_account_id;

const sendAuth=()=>{
    
let payload = {
    url:'http://localhost:3000',
    data:{ token:"skfhsdkfhksdfhsdkfhksdfhskfhsfkfkdh"}
};

    const bytes = new Uint8Array(Buffer.from(JSON.stringify(payload)));
    const signature = clientPvk.sign(bytes);

    return{
        serverSignature:signature,
        serverSigningAccount:clientID
    }
    
};


const recieveAuth = async( signingAccount,res)=>{
     const publickey = clientPvk.publicKey
     let url = "https://testnet.mirrornode.hedera.com/api/v1/accounts/" + signingAccount;

     const accountInfoResponse = await fetch(url,{method:"GET"});
     if(accountInfoResponse.ok){
        let data = await accountInfoResponse.json();

        if(!res.signedPayload) return('no ojectioon ') ;
        const serverSignasArr = Object.values(res.signedPayload.serverSignature);
        const serverSignAsBuffer= Buffer.from(serverSignasArr);

        const userSignasArr = Object.values(res.userSignature);
        const userSignAsBuffer= Buffer.from(userSignasArr);

        let server_key_verified = verifyData(res.signedPayload.originalPayload,publickey.tostring(),serverSignAsBuffer);
        let user_key_verified = verifyData(res.signedPayload,data.key.key ,userSignAsBuffer);

        if(server_key_verified && user_key_verified){
            return('Authentication Success');
        }
        else{ 
            return("Authentication Failed")
        }
     }
     else{
        return("Getting Public Key")
     }

}

const verifyData =(data ,publicKey ,signature)=>{
    const pubkey = PublicKey.fromString(publicKey);
    let bytes= new Uint8Array(Buffer.from(JSON.stringify(data)));
    let verify =pubkey.verify(bytes,signature);
    return verify;
}

module.exports = {sendAuth,recieveAuth} ; 