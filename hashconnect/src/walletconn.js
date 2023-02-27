import { HashConnect } from "hashconnect";
import {TokenCreateTransaction,TransferTransaction,AccountId,Client} from '@hashgraph/sdk';
// import { recieveAuth } from "../../hashconnect-backend/auth";
// import {fetch} from "fetch-node";
let hashconnect = new HashConnect();

let appMetaData = {
    name: "dpa-fintech",
    description: "first-draft",
    icon: "ddddsdsssdsdsdsd.com"
}
export const pairHashpack = async () => {
    let initData = await hashconnect.init(appMetaData, 'testnet', false)
    hashconnect.foundExtensionEvent.once((walletMetaData) => {
        hashconnect.connectToLocalWallet(initData.pairingString, walletMetaData);
    })

    hashconnect.pairingEvent.once((pairingData) => {
        console.log('wallet-paired');
        //gives u meta data have account ids and pairing data
        // console.log(`this is the paring data-------${pairingData}`);

        hashconnect.acknowledgeMessageEvent.once((acknowledgeData) => {
            //do something with acknowledge response data
            console.log('listening to the akknledeged data')
            console.log(acknowledgeData);
        })
    })

    console.log(initData);
    return initData
}

export let authenticateUser = async () => {
    const paylaod = {
        url: window.location.hostname,
        data: {
            token: "skfhsdkfhksdfhsdkfhksdfhskfhsfkfkdh"
        }
    }

    const hashconnectSaveData = JSON.parse(window.localStorage.hashconnectData);
    console.log(hashconnectSaveData);

    const res = await fetch('http://localhost:8080/authenticate');
    const { signingData } = await res.json();
    console.log({ signingData });
    const serverSigasArr = Object.values(signingData.serverSignature);
    const serverSignAsBuffer = Buffer.from(serverSigasArr);

    const auth = await hashconnect.authenticate(
        hashconnectSaveData.topic,
        hashconnectSaveData.pairingData[0].accountIDS[0],
        signingData.serverSigningAccount,
        serverSignAsBuffer,
        paylaod);

    const recieveAuthData = {
        singingAccount: hashconnectSaveData.pairingData[0].accountIDS[0],
        auth
    }

    const res2 = fetch('/recieveAuth',{
        method:"POST",
        mode:"cors",
        headers:{ 
            'content-type':'application/json'
        },
        body: JSON.stringify(recieveAuthData)
    });
    const msg = await res2.json();

    console.log(msg );

}



export const singtnx = async(tnxbytes) =>{
    let initdata =await  pairHashpack();
    // asssuming that the transection is the only TransferTransections and generating the same 
    const tnx = new TransferTransaction.fromBytes(tnxbytes);
    
    const hashconnectSaveData = JSON.parse(window.localStorage.hashconnectData);
    console.log(hashconnectSaveData);

    const singingAccount = hashconnectSaveData.pairingData[0].accountIDS[0];
    
    let response =await  hashconnect.sign(initdata.topic,new AccountId(singingAccount),tnx);
    
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
    let initdata =await  pairHashpack();
    
    const hashconnectSaveData = JSON.parse(window.localStorage.hashconnectData);
    console.log(hashconnectSaveData);

    const acctToSign = hashconnectSaveData.pairingData[0].accountIDS[0];
    
    const transaction = {
        topic: initData.topic,
        byteArray: transactionBytes,
        metadata: {
            accountToSign: acctToSign,
            returnTransaction: false,
            hideNft: false
        }
    }
    let response = await hashconnect.sendTransaction(initData.topic, transaction)
    return {status : response.success{} ;
}



