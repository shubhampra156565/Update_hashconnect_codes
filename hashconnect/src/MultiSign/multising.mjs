
const {
    TokenCreateTransaction,
    Client,
    TokenType,
    TokenInfoQuery,
    Hbar,
    TransactionId,
    PublicKey,AccountId,
    TransferTransaction,
    AccountCreateTransaction,
    AccountBalanceQuery, PrivateKey, Wallet
} = require("@hashgraph/sdk");
// const { default: TokenTransfer } = require("@hashgraph/sdk/lib/token/TokenTransfer");
require('dotenv').config();

// const treasuryAccountId = process.env.MY_ACCOUNT_ID;
const adminPublicKey = PublicKey.fromString(process.env.A2_pub_key);
const adminKey = PrivateKey.fromString(process.env.A2_pkey);
const adminAccount = process.env.A2_account_id;

const adminPublicKey1 = PublicKey.fromString(process.env.MY_Publickey);
const adminKey1= PrivateKey.fromString(process.env.MY_PRIVATE_KEY);
const usersAccount = process.env.MY_ACCOUNT_ID;


const tnx1 = () => {

    const tnxId = TransactionId.generate(AccountId.fromString(usersAccount));
    console.log(tnxId);

    const tnx = new TransferTransaction().addHbarTransfer(adminAccount,-1)
        .addHbarTransfer(usersAccount, 1)
        .setNodeAccountIds([new AccountId(3)])
        .setTransactionId(tnxId)
        .freeze();

    const signed = tnx.toBytes()

    console.log(signed);

    return signed;
}


//getting signature form the the admin 

const getSign = (bytes) =>{

    const newtnx = TransferTransaction.fromBytes(bytes);
    const singnature = adminKey.signTransaction(newtnx);
    return singnature;
}
const t1 = async (bytes,singnature) => {

    const client = Client.forTestnet().setOperator(usersAccount, adminKey1);
    const newtnx = TransferTransaction.fromBytes(bytes);
    const tnxwithsign = newtnx.addSignature(adminPublicKey,singnature);
    const submitTx = await tnxwithsign.execute(client);
    const receipt = await submitTx.getReceipt(client)
    const transactionStatus = `this is the status ` + receipt.status;
    console.log(transactionStatus);
    client.close();
};
const bytes = tnx1();

const singnature= getSign(bytes);

t1(bytes,singnature);
