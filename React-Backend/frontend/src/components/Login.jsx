import { useState } from "react";
import { useNavigate } from "react-router";
import apiClient from "../../services/apiClient";
import "./Login.css"


function Login() {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState("");

  //for navigation
  const navigate = useNavigate();

  const handleSubmit= async (e)=>{
    e.preventDefault();
    setLoading(true);

    try {
      console.log(`Trying to do a Login`);
      const data = await apiClient.login( email, password);
      console.log("Login response: ", data);
      if (data.success) {
        navigate("/profile");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }


  }
  return (
    <div>
      <h1>Welcome to login page</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input 
            type="email"
            name="email"
            id="email"
            placeholder="enater your email..."
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input 
            type="password"
            name="password"
            id="password"
            placeholder="enater your password..."
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Login....." : "Login"}
        </button>

      </form>

    </div>
  );
}

export default Login;
