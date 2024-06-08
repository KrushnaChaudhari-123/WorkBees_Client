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
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
    if(username.length <= 0){
      document.getElementById("username").focus();
      toast.error("Please enter an username");
      return;
    }
    if(password.length <= 0){
      document.getElementById("password").focus();
      toast.error("Please enter a password");
      return;
    }
    if (!passwordRegex.test(password) ) {
      document.getElementById("password").focus();
      toast.error("Password must be 8-15 characters long, include at least" +
       " one uppercase letter, one lowercase letter, one digit, and one special character (@$!%*?&)");
      return;
    }

    try {
      const res = await newRequest.post("/auth/login", { username, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      if(res){
        toast.success("Login Successfully!!!");
      }
      navigate("/")
    } catch (err) {
      toast.error(err.response.data);
      setError(err.response.data);
    }
  };

 
  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor="">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Enter UserName"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="">Password</label>
        <input
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />
             
     
        <button type="submit">Login</button>
        
      </form>
    </div>
  );
}

export default Login;
