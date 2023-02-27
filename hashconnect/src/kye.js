const  { PrivateKey } = require("@hashgraph/sdk");

const keygen = async()=>{

const key1=await  PrivateKey.generateED25519();
const key2=await  PrivateKey.generateED25519();

console.log( `${key1}
                ${key2}`);


}
keygen();
