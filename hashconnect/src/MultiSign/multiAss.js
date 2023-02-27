
import { TokenCreateTransaction, Client, TokenType, TokenInfoQuery, Hbar, TransactionId, PublicKey, AccountId, TransferTransaction, AccountCreateTransaction, AccountBalanceQuery, PrivateKey, Wallet } from "@hashgraph/sdk";
import { HashConnect } from "hashconnect";
let hashconnect = new HashConnect();

const MY_ACCOUNT_ID = "0.0.653440"
const MY_PRIVATE_KEY = "c37c63538fb57a78ec079254e748360a71c4de2617cc5c8068d1b54ce71b8cee"
const MY_Publickey = "86354359b003c72d63f3e315c265e7321d29339c63fc2c3061593c425730cc30"
// const treasuryAccountId = process.env.MY_ACCOUNT_ID;
// const adminPublicKey = PublicKey.fromString(process.env.A2_pub_key);
// const adminKey = PrivateKey.fromString(process.env.A2_pkey);
// const adminAccount = process.env.A2_account_id;

const adminPublicKey1 = PublicKey.fromString(MY_Publickey);
const adminKey1= PrivateKey.fromString(MY_PRIVATE_KEY);
const DPA = MY_ACCOUNT_ID;

export const tnx1 = (clientAcc) => {

    const tnxId = TransactionId.generate(AccountId.fromString(DPA));
    console.log(tnxId);

    const tnx = new TransferTransaction().addHbarTransfer(clientAcc,-1)
        .addHbarTransfer(DPA, 1)
        .setNodeAccountIds([new AccountId(3)])
        .setTransactionId(tnxId)
        .freeze();

    const signed = tnx.toBytes()

    console.log(signed);

    return signed;
}


// const getSign = (bytes) =>{

//     const newtnx = TransferTransaction.fromBytes(bytes);
//     const singnature = adminKey.signTransaction(newtnx);
//     return singnature;
// }


export const getSIgnfromHashpack1 = async(bytes1) =>{   
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
    const sign = response.signedTransaction
    return sign
}
export const t1 = async (bytes,singnature) => {

    // const clientpubkey = PublicKey.fromString('bdba48672a3c4fdc50923d0642b037cc486d99e6b37847a80c25efb521d0b96a')

    const client = Client.forTestnet().setOperator(DPA, adminKey1);

    const newtnx = TransferTransaction.fromBytes(singnature);
    // const tnxwithsign = newtnx.addSignature(clientpubkey,singnature);
    const submitTx = await newtnx.execute(client);
    const receipt = await submitTx.getReceipt(client)
    const transactionStatus = `this is the status ` + receipt.status;
    console.log(transactionStatus);
    client.close();
    return transactionStatus
};
export const t2 = async (bytes,singnature) => {

    const clientpubkey = PublicKey.fromString('bdba48672a3c4fdc50923d0642b037cc486d99e6b37847a80c25efb521d0b96a')

    const client = Client.forTestnet().setOperator(DPA, adminKey1);
    const newtnx = TransferTransaction.fromBytes(bytes);
    const tnxwithsign = newtnx.addSignature(clientpubkey,singnature);
    const submitTx = await tnxwithsign.execute(client);
    const receipt = await submitTx.getReceipt(client)
    const transactionStatus = `this is the status ` + receipt.status;
    console.log(transactionStatus);
    client.close();
    return transactionStatus
};


export const getSIgnfromHashpack = async(bytes1) =>{
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
    const newtnx = TransferTransaction.fromBytes(bytes1);
    const signature = await hashconnect.sign(topic1, accountid, newtnx);
    const retrunedSignature = signature.payload;
    // const respons1 = await hashconnect.sign(topic1,accountid,newtnx);
    // console.log(response);
    console.log(retrunedSignature);


    // console.log(JSON.stringify(response));
    // const data = localStorage.setItem(res,response);
    // console.log(data);
    // const {success , userSignature} = response;
    // console.log(success,userSignature);
    // return {response}
    return retrunedSignature}
