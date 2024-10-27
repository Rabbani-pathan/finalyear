import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./App.css";
import OtherPage from "./OtherPage";

function Home() {
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

    <div>
      <h1>BabaVali.com</h1>
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
                  <td>
                    <a
                      href={`https://www.rtherscan.io/address=${tx.blockHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {tx.blockHash}
                    </a>
                  </td>
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

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="nav-bar">
          <Link to="/">Home</Link>
          <Link to="/other">Other Page</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/other" element={<OtherPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
