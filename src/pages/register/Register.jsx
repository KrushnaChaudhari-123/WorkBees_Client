import React, { useState } from "react";
import upload from "../../utils/upload";
import "./Register.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Register() {
  const [file, setFile] = useState(null);
  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    country: '',
    phone: ''
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "India",
    isSeller: false,
    desc: "",
    phone: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
    // Reset the error for the field when user types
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const handleSeller = (e) => {
    setUser(prev => ({
      ...prev,
      isSeller: e.target.checked
    }));
  };

 


  const handleSubmit = async (e) => {
  
    e.preventDefault();
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
    const phoneNumberRegex = /^[6-9]\d{9}$/;

    if(user.username.length <= 0){
      document.getElementById("username").focus();
      toast.error("Please enter an username");
      return;
    }
   
    if(user.email.length <= 0){
      document.getElementById("email").focus();
      toast.error("Please enter an email");
      return;
    }
    if(user.password.length <= 0){
      document.getElementById("password").focus();
      toast.error("Please enter a password");
      return;
    }
    if(user.phone.length < 10){
      toast.error("Please enter a valid Mobile Number");
      document.getElementById( "phone").focus();
      return;
    }
    
    if(user.desc.length <= 0){
      document.getElementById("desc").focus();
      toast.error("Please enter a Description");
      return;
    }
    
    if (!emailRegex.test(user.email) ) {
      document.getElementById("email").focus();
      toast.error("Email format is wrong");
      return;
    }
    if (!passwordRegex.test(user.password) ) {
      document.getElementById("password").focus();
      toast.error("Password must be 8-15 characters long, include at least" +
       " one uppercase letter, one lowercase letter, one digit, and one special character (@$!%*?&)");
      return;
    }
    if(!phoneNumberRegex.test(user.phone)){
      document.getElementById("phone").focus();
      toast.error("Phone number format is wrong");
    }
    const url = await upload(file);

    try {
      await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });
      toast.success("Registration Successful!!!");
      navigate("/");
    } catch (err) {
      toast.error(err.message); 
      setIsError(true);
    }
  
  };

  // Validation function for the form


  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left" style={{ position: 'relative' }}>
          <h1>Create a new account</h1>
          <label htmlFor="">Username</label>
          <input
            name="username"
            id="username"
            type="text"
            placeholder="Name"
            onChange={handleChange}
          />
          {errors.username && <p className="error">{errors.username}</p>}
          {/* Add error message for other fields similarly */}

          <label htmlFor="">Email</label>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="Email"
            onChange={handleChange}
          />
          {/* Add error message for email field */}

          <label htmlFor="">Password</label>
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="password"
            onChange={handleChange}
          />
          {/* Add error message for password field */}

          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            style={{
              position: 'absolute', top: '320px', left: '380px', cursor: 'pointer'
            }}
            onClick={togglePasswordVisibility}
          />

          <label htmlFor="">Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          {/* Add error message for file upload field */}

          <label htmlFor="">Country</label>
          <input
            id="country"
            name="country"
            type="text"
            defaultValue={"India"}
            placeholder="INDIA"
            onChange={handleChange}
          />
          {/* Add error message for country field */}

          <button type="submit" >Register</button>

        </div>
        <div className="right">
          <h1>I want to become a seller</h1>
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="">Phone Number</label>
          <input
            id="phone"
            name="phone"
            type="text"
            placeholder="+91 7350478708"
            onChange={handleChange}
          />
          {/* Add error message for phone field */}

          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            id="desc"
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
          {/* Add error message for description field */}
        </div>
      </form>
    </div>
  );
}

export default Register;
