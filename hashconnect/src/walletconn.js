import { HashConnect } from "hashconnect";
// import {fetch} from 'node-fetch';
// import { recieveAuth } from "../../hashconnect-backend/auth";
// import {fetch} from "fetch-node";
let hashconnect = new HashConnect(true);


let appMetaData = {
    name: "dpa-fintech",
    description: "first-draft",
    icon: "ddddsdsssdsdsdsd.com"
}
export const pairHashpack = async () => {
    let initData = await hashconnect.init(appMetaData, "testnet", false);

    hashconnect.foundExtensionEvent.once((walletMetadata) => {
        hashconnect.connectToLocalWallet(initData.pairingString, walletMetadata);
    })

    hashconnect.pairingEvent.once((pairingData) => {
        console.log('wallet paired')
        console.log(pairingData)

        console.log(pairingData.accountIds[0]);
    })

    return initData
}

export let authenticateUser = async () => {
    const paylaod = {
        url: window.location.hostname,
        data: {
            token: "skfhsdkfhksdfhsdkfhksdfhskfhsfkfkdh"
        }
    }

    const res = await fetch('http://localhost:8080/authenticate');
    const { signingData } = await res.json();
    console.log({ signingData });

    const serverSigasArr = Object.values(signingData.serverSignature);
    const serverSignAsBuffer = Buffer.from(serverSigasArr);

    const r = window.localStorage.hashconnectData;
    const hashconnectSaveData = JSON.parse(r);
    console.log(hashconnectSaveData);
    console.log(hashconnectSaveData.topic)
    console.log(hashconnectSaveData.pairingData[0]);
    // const c = hashconnectSaveData.pairingData[0];
    const accountid = hashconnectSaveData.pairingData[0].accountIds[0]
    const topic = hashconnectSaveData.pairingData[0].topic
    console.log(topic);
    console.log(accountid);

    // let hashconnect1 = new HashConnect(appMetaData,'testnet',false);
    // let initData = await hashconnect1.init(appMetaData, 'testnet', false) 

    let auth = await hashconnect.authenticate(
        JSON.stringify(topic),
        JSON.stringify(accountid),
        signingData.serverSigningAccount,
        serverSignAsBuffer,
        paylaod);
        
    const recieveAuthData = {
        singingAccount: hashconnectSaveData.pairingData[0].accountIDS[0],
        auth
    }

    const res2 = fetch('http://localhost:8080/recieveAuth',{
        method:"POST",
        mode:"cors",
        headers:{ 
            'Content-type':'application/json'
        },
        body: JSON.stringify(recieveAuthData)
    });
    const msg = await res2.json();

    console.log(msg );


    
}

