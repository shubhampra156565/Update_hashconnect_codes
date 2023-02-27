import { Client, AccountUpdateTransaction,PublicKey, Hbar, TransactionId, AccountId, TokenAssociateTransaction, PrivateKey } from "@hashgraph/sdk";
// require('dotenv').config();
// import bodyparser from 'body-parser';

const usersAccount = "0.0.653440"
const adminKey1 = PrivateKey.fromString("c37c63538fb57a78ec079254e748360a71c4de2617cc5c8068d1b54ce71b8cee");
const adminPublicKey1 = "86354359b003c72d63f3e315c265e7321d29339c63fc2c3061593c425730cc30"



// const token = '0.0.3362740'
// const acc = '0.0.653440'

export const Associatetoken = async (token, acc) => {
    const transectionId = await TransactionId.generate(usersAccount);
    const tokenlist = [];
    tokenlist.push(token)
    const tx = new TokenAssociateTransaction()
        .setAccountId(acc)
        .setTokenIds(tokenlist)
        .setNodeAccountIds([new AccountId(3)])
        .setTransactionId(transectionId)
        .freeze()

    const bytes = tx.toBytes()
    return bytes
}

export const executetokenAss = async (bytes,signature, acc) => {
    
const usersAccount = "0.0.653440"
const adminKey1 = PrivateKey.fromString("c37c63538fb57a78ec079254e748360a71c4de2617cc5c8068d1b54ce71b8cee");

    
    const client = Client.forTestnet().setOperator(usersAccount, adminKey1);

    let url = "https://testnet.mirrornode.hedera.com/api/v1/accounts/" + acc;

    const accountinfo = await fetch(url, { method: "GET" });
    const data = accountinfo.json();
    console.log(data.key)
    const userspubkey = "bdba48672a3c4fdc50923d0642b037cc486d99e6b37847a80c25efb521d0b96a";
    const pubkey = PublicKey.fromString(userspubkey);
    const newtnx = TokenAssociateTransaction.fromBytes(bytes);
    const tnxwithSign = newtnx.addSignature(pubkey, signature);
    const tnxwithDPAsign =await tnxwithSign.sign(adminKey1);
    const submittnx = await tnxwithDPAsign.execute(client);
    const receipt = await submittnx.getReceipt(client);
    const transectionStatus = `the status of trasection is` + receipt.status;
    return transectionStatus;
}


export const t2 = async (bytes,singnature) => {
    
const usersAccount = "0.0.653440"
const adminKey1 = PrivateKey.fromString("c37c63538fb57a78ec079254e748360a71c4de2617cc5c8068d1b54ce71b8cee");

    const client = Client.forTestnet().setOperator(usersAccount, adminKey1);
    const newtnx = TokenAssociateTransaction.fromBytes(bytes);
    const userspubkey = "bdba48672a3c4fdc50923d0642b037cc486d99e6b37847a80c25efb521d0b96a";
    const pubkeuy = PublicKey.fromString(userspubkey);
    const tnxwithsign = newtnx.addSignature(pubkeuy,singnature);
    const submitTx = await tnxwithsign.execute(client);
    const receipt = await submitTx.getReceipt(client)
    const transactionStatus = `this is the status ` + receipt.status;
    console.log(transactionStatus);
    client.close();
};

export const t1 = async (bytes,singnature) => {

    // const clientpubkey = PublicKey.fromString('bdba48672a3c4fdc50923d0642b037cc486d99e6b37847a80c25efb521d0b96a')
    const DPA = "0.0.653440"
const adminKey1 = PrivateKey.fromString("c37c63538fb57a78ec079254e748360a71c4de2617cc5c8068d1b54ce71b8cee");

    const client = Client.forTestnet().setOperator(DPA, adminKey1);

    const newtnx = TokenAssociateTransaction.fromBytes(singnature);
    // const tnxwithsign = newtnx.addSignature(clientpubkey,singnature);
    const submitTx = await newtnx.execute(client);
    const receipt = await submitTx.getReceipt(client)
    const transactionStatus = `this is the status ` + receipt.status;
    console.log(transactionStatus);
    client.close();
    return transactionStatus
};
// const getSign = (bytes) =>{
//     const newtnx = TokenAssociateTransaction.fromBytes(bytes);
//     const singnature = clieintPrivatekey.signTransaction(newtnx);
//      return singnature;}



export const AccountUpdatetnx = async (acc) => {

    const transectionId = await TransactionId.generate(acc);

    const transaction = new AccountUpdateTransaction()
        .setAccountId(acc)
        // .setAutoRenewPeriod(2593000)
        .setMaxAutomaticTokenAssociations(102)
        .setMaxTransactionFee(new Hbar(5)) // this filrd is required for the transection
        .setNodeAccountIds([new AccountId(3)])
        .setTransactionId(transectionId)
        .freeze();
    const bytes = transaction.toBytes();
    return bytes;

}

