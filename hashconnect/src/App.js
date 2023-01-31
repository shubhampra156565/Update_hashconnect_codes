
import './App.css';
import pairing from './pairing';
import { pairHashpack } from './walletconn';
import { authenticateUser } from './walletconn';
import { tokensell } from './tokensell';

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
        <button onClick={()=>{
          pairing();

        }}>pair with hashconnect</button>
        <></>


        <button onClick={()=>{
          const initData1 = pairHashpack();
          console.log(initData1)
        }}>
          pair hashpack
        </button>


        <button onClick={()=>{
          authenticateUser();
          console.log('hi from authenticae user');
        }}>
           Authenticate
        </button>


        <button onClick={
          ()=>{
            console.log('hi buying your token');
            tokensell();
          }
        }>
          sell tokens 
        </button>
      </header>
    </div>
  );
}

export default App;
