import React, { useState } from "react";
import "./Login.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", { username, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      if(res){
        toast.success("Login Successfully!!!");
      }
      navigate("/")
    } catch (err) {
      toast.error("Login Unsuccessfull");
      setError(err.response.data);
    }
  };

 
  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor="">Username</label>
        <input
          name="username"
          type="text"
          placeholder="Enter UserName"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="">Password</label>
        <input
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />
             
     
        <button type="submit">Login</button>
        {error && error}
      </form>
    </div>
  );
}

export default Login;
