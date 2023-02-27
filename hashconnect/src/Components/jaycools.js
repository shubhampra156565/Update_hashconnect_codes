

import React, { useState } from 'react';
import { pairHashpack, authenticateUser } from '../jaycoolcodes';
import '../App.css';

function App1() {
  const [pairingString, setPairingString] = useState('')
  return (
    <div className="App">
      <header className="App-header">
    
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p id='accountid'></p>
        {
          pairingString &&
          <>
            <h1>Pairing string</h1>
            <p>{pairingString}</p>
          </>
        }
        <button onClick={authenticateUser}>Authenticate</button>
        
        <button onClick={async () => {
          const saveData = await pairHashpack()
          setPairingString(saveData.pairingString)
        }}>Pair wallet</button>
      </header>
    </div>
  );
}

export default App1;