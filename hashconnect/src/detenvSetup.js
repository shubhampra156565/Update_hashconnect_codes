import dotenv from 'dotenv';
dotenv.config();

const clientid=process.env.A2_account_id;
const clieintPrivatekey = PrivateKey.fromString(process.env.A2_pkey);

console.log(clientid);
console.log(clieintPrivatekey);