import React from "react";
import { useState } from "react";
import apiClient from "../../services/apiClient";
import { useNavigate } from "react-router";
import "./Signup.css"

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // console.log(`Trying to do a singup`);
      const data = await apiClient.signup(name, username, email, password);
      console.log("Signup response: ", data);
      if (data.success) {
        navigate("/login");
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
    // Make an api call to backend with data
    // get response from backend
    // take action based on response
  };

  return (
    <div className="signup">

      {/* <h1>
        <div>
          <h3>My States</h3>
          <p>{name}</p>
          {email}
          {password}
        </div>
        Welcome to Signup page
        {true && <div>Error: {error}</div>}
      </h1> */}

      <h1>Welcome to signup Page</h1>
      <form className="form-group" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="enter your name..."
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="enter your username..."
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="enter your email..."
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="enter your password..."
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Signup...." : "Signup"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
