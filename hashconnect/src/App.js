
import './App.css';
import pairing from './pairing';
import { pairHashpack,authenticateUser } from './HashpackConn';
// import { pairHashpack } from './walletconn';
// import { authenticateUser } from './walletconn';
import { tokensell } from './tokensell';
// import { singtnx } from './HashpackConn';
import { tnxbytes } from './tnxtobytes';
import { singTnxBytesHashpackSide } from './HashpackConn';
// import { HashConnect } from 'hashconnect';
import sendTrasaction from './signtnx';
// import { Key } from '@hashgraph/sdk';
// import { TransferTransaction } from '@hashgraph/sdk';
// import { AccountId } from '@hashgraph/sdk';
// import {Wallet} from "./Components/wallet"
// let hashconnect = new HashConnect();
import App1 from './Components/jaycools';
import AssociatebyUserPaidbyDPA from './Components/tokneAss';
import {AccountUpdatetnx} from './asstokenFT';
import {tnx1,getSIgnfromHashpack,t1} from './/MultiSign/multiAss'
import {sendSIgnedtnxfromHashpack} from './HashpackConn';
import {advancePairing} from './newPairing';
import { dissconnect } from './newPairing';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          connect to hashpack
        </a>

      {/* <Wallet/> */}
    
        <button onClick={() => {
          pairing();

        }}>pair with hashconnect</button>
        <></>
       

        <button onClick={() => {
           pairHashpack();
        }}>
          pair hashpack
        </button>


        <button onClick={() => {
          authenticateUser();

        }}>
          Authenticate
        </button>


        <button onClick={
          () => {
            console.log('hi buying your token');
            tokensell();
          }
        }>
          sell tokens
        </button>

        <button onClick={async () => {


          console.log('signtnx is clicked');
          const r = window.localStorage.hashconnectData;
          const hashconnectSaveData = JSON.parse(r);
          console.log(hashconnectSaveData);
          console.log(hashconnectSaveData.topic)
          console.log(hashconnectSaveData.pairingData[0]);
          // const c = hashconnectSaveData.pairingData[0];
          const accountid = hashconnectSaveData.pairingData[0].accountIds[0]
          const topic = hashconnectSaveData.pairingData[0].topic;
          const ekey = hashconnectSaveData.encryptionKey;
          console.log(topic);
          console.log(accountid);
          console.log(ekey);

          const bytes =await tnxbytes(accountid,'0.0.653440');
          const status =await singTnxBytesHashpackSide(bytes);
          if (status){
          console.log(`sing tnx is completed`)};
        }}>singtnx</button>


        <button onClick={() => {
          const r = window.localStorage.hashconnectData;
          const hashconnectSaveData = JSON.parse(r);
          console.log(hashconnectSaveData);
          console.log(hashconnectSaveData.topic)
          console.log(hashconnectSaveData.pairingData[0]);
          // const c = hashconnectSaveData.pairingData[0];
          const accountid = hashconnectSaveData.pairingData[0].accountIds[0]
          const topic = JSON.stringify (hashconnectSaveData.pairingData[0].topic)
          console.log(topic);
          console.log(accountid);
        }}>
          local storage data
        </button>
        <button onClick={() => {
        }}>consleing the hahsconnect data</button>

        <h1> 
          the second type of transections beings from here 
        </h1>
        <button onClick={async ()=>
        {
          const r = window.localStorage.hashconnectData;
          const hashconnectSaveData = JSON.parse(r);
          console.log(hashconnectSaveData);
          console.log(hashconnectSaveData.topic)
          console.log(hashconnectSaveData.pairingData[0]);
          // const c = hashconnectSaveData.pairingData[0];
          const accountid = hashconnectSaveData.pairingData[0].accountIds[0]
          const topic = hashconnectSaveData.pairingData[0].topic;
          const ekey = hashconnectSaveData.encryptionKey;
          console.log(topic);
          console.log(accountid);
          console.log(ekey);
          const res = await sendTrasaction(topic,accountid);
          console.log(res);
          
        }
        }>clicke to send 1 h bar to google from your acc
        
        </button>
        <button onClick={()=>{
          localStorage.clear();
          console.log('local storage clear')
        }}>claer local storage </button>
        <p> here is the code for associating a token - fees paid by Dpa for this user has to sing the transection</p>


        <AssociatebyUserPaidbyDPA/>

  
        <App1/>
        <button onClick={async()=>{
          const r = window.localStorage.hashconnectData;
          const hashconnectSaveData = JSON.parse(r);
          console.log(hashconnectSaveData);
          console.log(hashconnectSaveData.topic)
          console.log(hashconnectSaveData.pairingData[0]);
          // const c = hashconnectSaveData.pairingData[0];
          const accountid = hashconnectSaveData.pairingData[0].accountIds[0]
          const topic = hashconnectSaveData.pairingData[0].topic;
          const ekey = hashconnectSaveData.encryptionKey;
          console.log(topic);
          console.log(accountid);
          console.log(ekey);
          // const res = await sendTrasaction(topic,accountid);
          // console.log(res);
          const bytes = await AccountUpdatetnx(accountid);
          const status =await singTnxBytesHashpackSide(bytes);
          if (status){
          console.log(`sing tnx is completed`)};
          

        }}>
          click to update the account info
        </button>
        <button onClick={async()=>{
              const r = window.localStorage.hashconnectData;
              const hashconnectSaveData = JSON.parse(r);
              console.log(hashconnectSaveData);
              console.log(hashconnectSaveData.topic)
              console.log(hashconnectSaveData.pairingData[0]);
              // const c = hashconnectSaveData.pairingData[0];
              const accountid = hashconnectSaveData.pairingData[0].accountIds[0]
              const topic = hashconnectSaveData.pairingData[0].topic;
              const ekey = hashconnectSaveData.encryptionKey;
              console.log(topic);
              console.log(accountid);
              console.log(ekey);
              const bytes = await tnx1(accountid);
              const signature = await sendSIgnedtnxfromHashpack(bytes);
              const sign = signature.response.signedTransaction;
              console.log(sign);
              
              const ex = await t1(bytes,sign);
              console.log(ex);
        }}> ckick her to sing the tnx </button> 


        <button onClick={()=>{
          advancePairing();
        }}> advancePairing</button>
        
        <button onClick={()=>{
          dissconnect();
        }}> disconnect</button>
      </header>
    </div>

  );
}
export default App;


