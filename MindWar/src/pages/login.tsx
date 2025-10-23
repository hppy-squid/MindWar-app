import { useState } from "react";
import { login, register } from "../api/userApi";


export default function LoginPage() {
  const [loginUsername, setloginUsername] = useState("");
  const [registerUsername, setregisterUsername] = useState("");
  const [loginPassword, setloginPassword] = useState("");
    const [registerPassword, setregisterPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      const user = await login(loginUsername, loginPassword);
      console.log("Logged in user:", user);
      // Här kan du spara användaren i context eller state
    } catch (err) {
      setError("Login failed");
    }
  };

const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      const user = await register(registerUsername, registerPassword);
      console.log("Logged in user:", user);
      // Här kan du spara användaren i context eller state
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <>
      <div>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={loginUsername}
            onChange={(e) => setloginUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setloginPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      <div>
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            value={registerUsername}
            onChange={(e) => setregisterUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={registerPassword}
            onChange={(e) => setregisterPassword(e.target.value)}
          />
          <button type="submit">Register</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </>
  );
}