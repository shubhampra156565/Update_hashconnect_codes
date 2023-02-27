
import { HashConnect } from "hashconnect";
import {TransferTransaction,TokenAssociateTransaction,TransactionId,AccountId} from '@hashgraph/sdk';

// import {SimpleCrypto} from "simple-crypto-js";

// import { tnxbytes } from "./tnxtobytes";
// import { recieveAuth } from "../../hashconnect-backend/auth";
// import {fetch} from "fetch-node";
let hashconnect = new HashConnect();
let appMetaData = {
    name: "dpa-fintech",
    description: "first-draft",
    icon: "ddddsdsssdsdsdsd.com"
}

export const pairHashpack = async () => {
    let initData = await hashconnect.init(appMetaData, 'testnet', false);

    hashconnect.foundExtensionEvent.once((walletMetaData) => {
        hashconnect.connectToLocalWallet(initData.pairingString, walletMetaData);
    })

    
    hashconnect.pairingEvent.once((pairingData) => {
        console.log('wallet-paired');
        //gives u meta data have account ids and pairing data
        // console.log(`this is the paring data-------${pairingData}`);
        console.log(pairingData);

        hashconnect.acknowledgeMessageEvent.once((acknowledgeData) => {
            //do something with acknowledge response data
            console.log('listening to the akknledeged data')
            console.log(acknowledgeData);
        })
    })
    console.log('akoeleged- iske badd retutning the out')
    console.log(initData);
    return initData
}

export const authenticateUser = async () => {
    const payload = {
        url: window.location.hostname,
        data: {
            token: "skfhsdkfhksdfhsdkfhksdfhskfhsfkfkdh"
        }
    }

    const hashconnectSaveData = JSON.parse(window.localStorage.hashconnectData);
    console.log(hashconnectSaveData);

    const res = await fetch('http://localhost:8080/authenticate');
    const { signingData } = await res.json();

    const serverSigasArr = Object.values(signingData.serverSignature);
    const serverSignAsBuffer = Buffer.from(serverSigasArr);

    let auth = await hashconnect.authenticate(
        hashconnectSaveData.topic,
        hashconnectSaveData.pairingData[0].accountIds[0],
        signingData.serverSigningAccount,
        serverSignAsBuffer,
        payload);

    const recieveAuthData = {
        singingAccount: hashconnectSaveData.pairingData[0].accountIds[0],
        auth
    }

    const res2 = await fetch('http://localhost:8080/recieveAuth', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recieveAuthData),
    })
    const {authMessage} = await res2.json()
    console.log('recived auth message')
    const log = JSON.stringify(authMessage);
    console.log(log);
}


export const singtnx = async(tnxbytes) =>{
    // asssuming that the transection is the only TransferTransections and generating the same tnx object and returning sigranture of the same.
    const tnx = TransferTransaction.fromBytes(tnxbytes);
     let initdata = hashconnect.init(appMetaData,'testnet',true);
    const hashconnetData = window.localStorage.hashconnectData;
    
    const hashconnectSaveData = JSON.parse(hashconnetData);

    const singingAccount = hashconnectSaveData.pairingData[0].accountIDS[0];
    
    let {response} =await  hashconnect.sign(initdata.topic,new AccountId(singingAccount),tnx);
    
    // if (response.success){
    //     return{ status:response.success.,
    //             signature : response.userSignature}
    // }
    // else{
    //     return {status:false }
    // }
    return response.userSignature; 
}
//this will submitted from the side of the cliet or hashpack 
export const singTnxBytesHashpackSide = async(transactionBytes) =>{
    //neeeded init data 
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
          

        //   // Create a new SimpleCrypto instance with a secret key
        //   const simpleCrypto = new SimpleCrypto(ekey);
          
        //   // The message you want to encrypt
        //   const message = transactionBytes
          
        //   // Encrypt the message
        //   const encryptedMessage = simpleCrypto.encrypt(message);
    const transaction = {
        topic: topic1,
        byteArray: transactionBytes,
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
}
// import { MessageTypes } from "hashconnect";
// import { Uint8Array} from '@babel/core'
// const Reponse = new MessageTypes.SigningResponse

// /**
//  * @async 
//  * @method
//  * @param {Uint8Array} transactionBytes 
//  * @returns {MessageTypes.SigningResponse} 
//  */
export const sendSIgnedtnxfromHashpack = async(bytes1) =>{
    //neeeded init data 
    
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

        //   const token = '0.0.3362740';
        //   const clientid = '0.0.653440';
        //   const transectionId = TransactionId.generate(accountid);
        //   const tokenlist = [];
        //   tokenlist.push(token)

        //   const tx = await new TokenAssociateTransaction()
        //       .setAccountId(accountid)
        //       .setTokenIds(tokenlist)
        //       .setNodeAccountIds([new AccountId(3)])
        //       .setTransactionId(transectionId)
        //       .freeze()
      
        //   const bytes = tx.toBytes()

        //   let  newtnx =  TokenAssociateTransaction().fromBytes(bytes);
        //   const newtnx = TokenAssociateTransaction.fromBytes(bytes1);
       

        //   // Create a new SimpleCrypto instance with a secret key
        //   const simpleCrypto = new SimpleCrypto(ekey);
          
        //   // The message you want to encrypt
        //   const message = transactionBytes
          
        //   // Encrypt the message
        //   const encryptedMessage = simpleCrypto.encrypt(message);
          
    const transaction = {
        topic: topic1,
        byteArray: bytes1,
        metadata: {
            accountToSign: accountid,
            returnTransaction: true,
            hideNft: false
        }
    }
    const response = await hashconnect.sendTransaction(topic1, transaction);
    // const respons1 = await hashconnect.sign(topic1,accountid,newtnx);
    console.log(response);
    // console.log(JSON.stringify(response));
    // const data = localStorage.setItem(res,response);
    // console.log(data);
    // const {success , userSignature} = response;
    // console.log(success,userSignature);
    return {response}
}

export const getSIgnfromHashpack = async(bytes1) =>{   
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
    const transaction = {
        topic: topic1,
        byteArray: bytes1,
        metadata: {
            accountToSign: accountid,
            returnTransaction: true,
            hideNft: false
        }
    }
    const response = await hashconnect.sendTransaction(topic1, transaction);
    console.log(response);
    return {response}

}




