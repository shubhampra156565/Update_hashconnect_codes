const  { PrivateKey,TransferTransaction, TransactionId,AccountId}=require("@hashgraph/sdk");
const bodyparser = require('body-parser');

 const tokentransfer= async(token,amount,acc)=>{
    const client_id = "0.0.636440"
    const transectionId =await TransactionId.generate(client_id);
    const tx =await new TransferTransaction().addTokenTransfer(token, acc,-amount)
        .addTokenTransfer(token, client_id, amount)
        .setNodeAccountIds([new AccountId(3)])
        .setTransactionId(transectionId)
        .freeze()
    const pv = "c37c63538fb57a78ec079254e748360a71c4de2617cc5c8068d1b54ce71b8cee"
    const priavatekey =await PrivateKey.fromString(pv);
    const signed =await tx.sign(priavatekey);

    const bytes = await signed.toBytes()

    return bytes
    
}
const  fiatSettle=(amount)=>{
    console.log('deducted')
}

module.exports ={tokentransfer};




