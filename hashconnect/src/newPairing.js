import { HashConnect } from 'hashconnect';
// import { HashConnect } from 'hashconnect/dist/cjs/main';

export const advancePairing = async () => {
    let appMetadata = {
        url: 'http://localhost:3000',
        name: 'Dapps',
        description: "An example hedera dApp",
        icon: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2017%2F02%2F19%2F22%2F14%2Fsun-2081062__480.png&imgrefurl=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Ffree%2520icons%2F&tbnid=41eaXQ6VOvhMZM&vet=12ahUKEwiNkZ3h3uT8AhXfmtgFHZXGDecQMygdegUIARCjAg..i&docid=I_O9BWsIsM1EMM&w=504&h=480&q=icons%20images&ved=2ahUKEwiNkZ3h3uT8AhXfmtgFHZXGDecQMygdegUIARCjAg'
    }

    let hashconnect = new HashConnect(false);
    let initData = await hashconnect.init(appMetadata, 'testnet', true); //true and false for single account or multiple account pairing 
    
    console.log(initData);

    const savedPairings = hashconnect.hcData;
    console.log(savedPairings);

    // let state = hashconnect.connect();
    if (true) {

        hashconnect.foundExtensionEvent.once((walletMetadata) => {
            //do something with metadata

            const pairings = hashconnect.hcData.pairingData;
            console.log(pairings);
            console.log(walletMetadata);
            // cheack the connect wallet is Hedera only then procedd \
            hashconnect.findLocalWallets();
            hashconnect.connectToLocalWallet();
        })

        console.log('inside if block');


    }
    else{ 
        const pairingString =hashconnect.generatePairingString(initData.topic,'testnet',true);
        console.log(pairingString);

        hashconnect.acknowledgeMessageEvent.once((acknowledgeData) => {
            //do something with acknowledge response data
            if( acknowledgeData.result){
            const pairings = hashconnect.hcData.pairingData;
            const new_account = pairings[0].accountIds;
            const topic= pairings[0].topic;
            console.log(new_account);
            console.log(topic);
            console.log(acknowledgeData);
            }

        })
        
    }
}

export const dissconnect = async() =>{
    let appMetadata = {
        url: 'http://localhost:3000',
        name: 'Dapps',
        description: "An example hedera dApp",
        icon: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2017%2F02%2F19%2F22%2F14%2Fsun-2081062__480.png&imgrefurl=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Ffree%2520icons%2F&tbnid=41eaXQ6VOvhMZM&vet=12ahUKEwiNkZ3h3uT8AhXfmtgFHZXGDecQMygdegUIARCjAg..i&docid=I_O9BWsIsM1EMM&w=504&h=480&q=icons%20images&ved=2ahUKEwiNkZ3h3uT8AhXfmtgFHZXGDecQMygdegUIARCjAg'
    }
    let hashconnect = new HashConnect(false);
    let initData = await hashconnect.init(appMetadata, 'testnet', true); //true and false for single account or multiple account pairing 
    console.log(initData);
    const topic = hashconnect.hcData.topic;
    console.log(topic);
    hashconnect.disconnect(topic);
    console.log('diss- connected');

}