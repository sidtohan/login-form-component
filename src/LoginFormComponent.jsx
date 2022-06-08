const { useState } = require("react");

const LoginFormComponent = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Contains the logic for api fetch and checking it

    // if false, return and cancel

    // if true, set loggedIn to true
    setLoggedIn(true);
  };

  const connectWallet = (e) => {
    // Logic for connecting wallet
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
          <button type="button" onClick={connectWallet}>
            Connect Wallet
          </button>
        </div>
      )}
    </section>
  );
};

export default LoginFormComponent;
