
const {
    TokenCreateTransaction,
    Client,
    TokenType,
    TokenInfoQuery,
    Hbar,
    AccountUpdateTransaction,
    TransactionId,
    PublicKey,AccountId,
    TransferTransaction,
    AccountCreateTransaction,
    AccountBalanceQuery, PrivateKey, Wallet
} = require("@hashgraph/sdk");
// const { default: TokenTransfer } = require("@hashgraph/sdk/lib/token/TokenTransfer");
require('dotenv').config();

const adminPublicKey = PublicKey.fromString(process.env.A2_pub_key);
const adminKey = PrivateKey.fromString(process.env.A2_pkey);
const adminAccount = process.env.A2_account_id;

const adminPublicKey1 = PublicKey.fromString(process.env.MY_Publickey);
const adminKey1= PrivateKey.fromString(process.env.MY_PRIVATE_KEY);
const adminAccount1 = process.env.MY_ACCOUNT_ID;

// const client = Client.forTestnet().setOperator(adminAccount1,adminKey1);
const client1 = Client.forTestnet().setOperator(adminAccount,adminKey);

const setRenewableAccount = async() =>{

    
    const tnxId = TransactionId.generate(AccountId.fromString(adminAccount));
//Create the transaction to update the key on the account
const transaction =  new AccountUpdateTransaction()
    .setAccountId(adminAccount1)
    // .setAutoRenewPeriod(2593000)
    .setMaxAutomaticTokenAssociations(102)
    .setMaxTransactionFee(new Hbar(5)) // this filrd is required for the transection
    .setNodeAccountIds([new AccountId(3)])
    .setTransactionId(tnxId)
    .freeze();

const bytes = transaction.toBytes();
console.log(bytes);
const tnx = AccountUpdateTransaction.fromBytes(bytes);

const sing = adminKey1.signTransaction(tnx);

const tnxwithSign  = tnx.addSignature(adminPublicKey1,sing)

//Sign the transaction with the old key and new key
// const signTx = await tnxwithSign.sign(adminKey1);

//SIgn the transaction with the client operator private key and submit to a Hedera network
const txResponse = await tnxwithSign.execute(client1);
//Request the receipt of the transaction
const receipt = await txResponse.getReceipt(client1);

//Get the transaction consensus status
const transactionStatus = receipt.status;

console.log("The transaction consensus status is " +transactionStatus.toString());

//v2.0.5
process.exit();
}
setRenewableAccount();



//note in the the theree step we need to create trnasection then add the singuature to it and return the signaute 