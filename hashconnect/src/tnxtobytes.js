
import {TransferTransaction,AccountId,TransactionId} from '@hashgraph/sdk';

export const tnxObj = (userAccount,accDPA) => {

    const tnxId = TransactionId.generate(AccountId.fromString(userAccount));

    console.log(tnxId);

    const tnx = new TransferTransaction().addHbarTransfer(userAccount, -1)
        .addHbarTransfer(accDPA,1)
        .setNodeAccountIds([new AccountId(3)])
        .setTransactionId(tnxId)
        .freeze();


    const signed = tnx.toBytes()

    console.log(signed);

    return tnx;
}
export const tnxbytes = async(userAccount,accDPA) => {

    const tnxId = TransactionId.generate(AccountId.fromString(userAccount));
    const dpa  =  AccountId.fromString(accDPA);
    console.log(tnxId);

    const tnx = new TransferTransaction().addHbarTransfer(userAccount, -1)
        .addHbarTransfer(dpa,1)
        .setNodeAccountIds([new AccountId(3)])
        .setTransactionId(tnxId)
        .freeze();

    const signed = tnx.toBytes()

    console.log(signed);

    return signed;
    
}