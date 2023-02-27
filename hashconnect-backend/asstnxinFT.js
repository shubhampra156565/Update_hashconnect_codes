import { TokenCreateTransaction, Client, TokenType, TokenInfoQuery, Hbar, TransactionId, PublicKey, AccountId, TokenAssociateTransaction, TransferTransaction, AccountCreateTransaction, AccountBalanceQuery, PrivateKey, Wallet, TokenAllowance } from "@hashgraph/sdk";
require('dotenv').config();
import bodyparser from 'body-parser';

const clientid=process.env.A2_account_id;
const clieintPrivatekey = PrivateKey.fromString(process.env.A2_pkey);

// const token = '0.0.3362740'
// const acc = '0.0.653440'

export const Associatetoken = async(token, acc) => {
    const transectionId = await TransactionId.generate(AccountId.fromString(AccountId.fromString(acc)));
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


export const executetokenAss = async(bytes,sign,acc) =>{
    const client = Client.forTestnet().setOperator(clientid,clieintPrivatekey);
    
    let url = "https://testnet.mirrornode.hedera.com/api/v1/accounts/" + acc;

    const accountinfo = await fetch(url,{method:"GET"});
    const data = accountinfo.json();
    console.log(data.key)
    const userspubkey  = data.key;

    const newtnx = TokenAssociation.fromBytes(bytes);
    const tnxwithSign = newtnx.addSignature(userspubkey,sign);
    const submittnx = await tnxwithSign.execute(client);
    const recipt = await submittnx.getRecipt(client);
    const transectionStatus = `the status of trasection is`+ recipt.status;

    return( transectionStatus);
}

const getSign = (bytes) =>{
    const newtnx = TokenAssociateTransaction.fromBytes(bytes);
    const singnature = clieintPrivatekey.signTransaction(newtnx);
     return singnature;}

