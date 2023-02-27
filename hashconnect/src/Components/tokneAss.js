// import { HashConnect } from "hashconnect";
import React, { useState } from "react";
// import {Associatetoken, executetokenAss} from "../asstokenFT";
import {Associatetoken, t1} from "../asstokenFT";
import {executetokenAss} from "../asstokenFT";
import {sendSIgnedtnxfromHashpack} from '../HashpackConn';


// let hashconnect = new HashConnect();

const AssociatebyUserPaidbyDPA = () => {
  const [inputValue, setInputValue] = useState("");

  const handleClick = async() => {
          const r = window.localStorage.hashconnectData;
          const hashconnectSaveData = JSON.parse(r);
          console.log(hashconnectSaveData);
          console.log(hashconnectSaveData.topic)
          console.log(hashconnectSaveData.pairingData[0]);
          // const c = hashconnectSaveData.pairingData[0];
          const accountid = hashconnectSaveData.pairingData[0].accountIds[0]
          const topic = hashconnectSaveData.pairingData[0].topic
          // const topic1 = JSON.stringify(topic);
          console.log(topic);
          console.log(accountid);
          console.log(inputValue);
          const clientid = '0.0.3465292'
// const clieintPrivatekey = PrivateKey.fromString('f8cad124b290b08c7f900f1935775a1b7e8f9571582eb1544893321d9d648961');

          // const body = {token:inputValue,acc:accountid};

          const bytes = await Associatetoken(inputValue,accountid);
          const signature = await sendSIgnedtnxfromHashpack(bytes);
          const sign = signature.response.signedTransaction;
          console.log(sign);
          // const singedbytes = sign.toBytes()
          // const tnx = await executetokenAss(bytes,sign,accountid);
          const tnx = await t1(bytes,sign);
          console.log(tnx);
};

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  return (
    <div>
      <input type="text" value={inputValue} onChange={handleChange} />
      <button onClick={handleClick}>Associate token </button>
    </div>
  );
};

export default AssociatebyUserPaidbyDPA;

