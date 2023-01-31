import {HashConnect} from 'hashconnect';
// import { HashConnect } from 'hashconnect/dist/cjs/main';

let pairing = async()=>{
    let appMetadata = { 
        url : 'http://localhost:3000',
        name : 'Dapps',
        description: "An example hedera dApp",
        icon : 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2017%2F02%2F19%2F22%2F14%2Fsun-2081062__480.png&imgrefurl=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Ffree%2520icons%2F&tbnid=41eaXQ6VOvhMZM&vet=12ahUKEwiNkZ3h3uT8AhXfmtgFHZXGDecQMygdegUIARCjAg..i&docid=I_O9BWsIsM1EMM&w=504&h=480&q=icons%20images&ved=2ahUKEwiNkZ3h3uT8AhXfmtgFHZXGDecQMygdegUIARCjAg'
    }

    
let hashconnect = new HashConnect(false);

console.log(hashconnect);

console.log('hash connect is imported ');

let initData = await hashconnect.init(appMetadata,'testnet',false);
// 
let privatekey = initData.privkey;

console.log(privatekey+`this is the private key to which you are connected`);

let state = hashconnect.connect();

let topic =state.topic ;
console.log ( topic);

// u can change to the mainnet also
let pairingstring = hashconnect.generatePairingString(state,'testnet');

console.log(pairingstring);

hashconnect.findLocalWallets();

hashconnect.connectToLocalWallet(pairingstring);

}

export default pairing;

