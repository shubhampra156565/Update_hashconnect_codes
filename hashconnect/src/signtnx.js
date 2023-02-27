import { AccountId, TransferTransaction } from "@hashgraph/sdk";
import { HashConnect } from "hashconnect";

let hashconnect = new HashConnect(); 
const sendTrasaction  = async(topic,accountToSign)=>{
    const provider = hashconnect.getProvider('testnet',topic,accountToSign);

    const signer = hashconnect.getSigner(provider);

    let tnx  = await new TransferTransaction().addHbarTransfer(AccountId.fromString(accountToSign),-1)
                .addHbarTransfer(AccountId.fromString('0.0.3'),1)
                     .freezeWithSigner(signer);
    
    let res = await tnx.executeWithSigner(signer);

    // console.log(res)
    console.log('this is the transectio for the ')
    window.alert(`trasections is doneer with this response ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------the responses is =========>${res}`);
}
export default sendTrasaction;
