import axios from "axios";

const { useState } = require("react");

const LoginFormComponent = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("")

  const handleLogin = (e) => {
    e.preventDefault();
    // Contains the logic for api fetch and checking it
    axios.post("http://localhost:8000/login-user", {email: email, password: password}).then((response) => {
      var data  = response.data;
      setToken(data.token);
      console.log(data.token);
      setLoggedIn(true);
    }).catch((error) => {
      alert(error.message);
    })
    // if false, return and cancel

    // if true, set loggedIn to true
  };

  const connectWallet = async (e) => {
    // Logic for connecting wallet
    e.preventDefault();
    const accounts = await window.ethereum
    .request({ method: "eth_requestAccounts" })
    .catch((e) => {
      console.error(e.message);
      return;
    });
  if (!accounts) {
    return;
  }

  document.getElementById("connect").innerHTML = accounts[0]
  document.getElementById("connect").disabled = true;
  // Network switch start

  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x4" }],
    });
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x4",
              chainName: "Rinkeby Test Network",
              rpcUrls: [
                "https://speedy-nodes-nyc.moralis.io/7ce69af8c67a5c54f3533468/eth/rinkeby2",
              ] /* ... */,
            },
          ],
        });
      } catch (addError) {
        alert("Please switch to ethereum network.");
      }
    }
    // handle other "switch" errors
  }

  let config = {
    headers: {
      authorization:token
    }
  }

  axios.post("http://localhost:8000/update-user-wallet", {email: email, newWallet: accounts[0]}, config).then((response) => {
    alert(response.data.message)
  }).catch((error) => {
    alert(error.message)
  })
    console.log("Wallet Connected");

  };
  return (
    <section className="login-form">
      {!loggedIn ? (
        <form onSubmit={handleLogin}>
          Email{" "}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          Password{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Log in</button>
        </form>
      ) : (
        <div className="successful-login">
          <h3 className="heading">You are now logged in</h3>
          <button type="button" id="connect" onClick={connectWallet}>
            Connect Wallet
          </button>
        </div>
      )}
    </section>
  );
};

export default LoginFormComponent;
