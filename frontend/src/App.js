import { useState } from "react";
import { ethers } from "ethers";
import Contract from "../src/HelloApe.json";

const tokenAddress = "0x2663714e6949209229F6B9b28DfE53F1b7f2b62D";

function App() {
  const [userAddress, setUserAddress] = useState("");
  const [greeting, setGreeting] = useState("");

  async function getGreeting() {
    if (typeof window.ethereum !== "undefined") {
      try {
        const [account] = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setUserAddress(account);

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(tokenAddress, Contract.abi, signer);
        
        const greetingFromContract = await contract.greeting();
        setGreeting(greetingFromContract);
      } catch (error) {
        console.error("Error fetching greeting:", error);
      }
    } else {
      console.log("Please install MetaMask!");
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>{userAddress}</h2>
        <h2>{greeting}</h2>
        <button onClick={() => getGreeting()}>Click</button>
      </header>
    </div>
  );
}

export default App;
