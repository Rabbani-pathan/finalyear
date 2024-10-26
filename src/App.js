import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [contractAddress, setContractAddress] = useState("");
  const [apiResult, setApiResult] = useState([]);

  const handleInputChange = (e) => {
    setContractAddress(e.target.value);
  };

  const fetchApiData = async () => {
    const apiKey = "FBXGXMYSW5AGYX7P4YZV2HHCRD3439B4HG";
    const endpoint = `https://api.etherscan.io/api?module=account&action=tokennfttx&contractaddress=${contractAddress}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${apiKey}`;
    
    try {
      const response = await axios.get(endpoint);
      setApiResult(response.data.result); // Extract the result array from the response
    } catch (error) {
      console.error("API fetch error: ", error);
    }
  };

  return (
    <div className="App">
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter contract address"
          value={contractAddress}
          onChange={handleInputChange}
        />
        <button onClick={fetchApiData}>Fetch Data</button>
      </div>

      {apiResult.length > 0 && (
        <div>
          <h2>API Result:</h2>
          <table>
            <thead>
              <tr>
                <th>Parent transaction Hash</th>
                <th>Block</th>
                <th>Gas</th>
                <th>From</th>
                <th>To</th>
                <th>Gas Price</th>
              </tr>
            </thead>
            <tbody>
              {apiResult.map((tx, index) => (
                <tr key={index}>
                  <td>{tx.blockHash}</td>
                  <td>{tx.blockNumber}</td>
                  <td>{tx.gas}</td>
                  <td>{tx.tokenName}</td>
                  <td>{tx.to}</td>
                  <td>{tx.gasPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
