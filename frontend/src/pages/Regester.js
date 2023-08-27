import React, { useState } from "react";
import "../css/login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faExclamationCircle,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { faLock } from "@fortawesome/free-solid-svg-icons";

const Regester = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [UserName, setusername] = useState("");
  const [role, setrole] = useState();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [usernameError, setusernameError] = useState(false);
  const [usernamerole, setroleError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email validation regex

  const onsubmitRegester = async () => {
    console.log("Register form submitted!");
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Username:", UserName);
    console.log("role:", role);
    try {
      const response = await fetch("http://localhost:1336/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          username: UserName,
          role: role,
        }),
      });

      
      if (response.ok) {
        console.log("Registration successful!");
       
        if(role == "User"){
          navigate('/profile')
        }
        else{
          navigate('/user')
        }
      } else {
      
        console.log("Registration failed:", response.status);
       
      }
    } catch (error) {
      console.error("Error occurred:", error);
     
    }
    setIsAuthenticated(true);
  };

  const submitform = () => {
   
    if (!email || !emailRegex.test(email)) {
      setEmailError(true);
      setTimeout(() => setEmailError(false), 1400); 
    }

    
    if (!password || !isPasswordValid(password)) {
      setPasswordError(true);
      setTimeout(() => setPasswordError(false), 1400); 
    }

   
    if (!UserName || !hasSpecialCharacter(UserName)) {
      setusernameError(true);
      setTimeout(() => setusernameError(false), 1400);
    }

   
    const allFieldsValid = email && password && UserName;
    const validEmail = emailRegex.test(email);
    const validPassword = isPasswordValid(password);
    const validUsername = hasSpecialCharacter(UserName);

    if (allFieldsValid && validEmail && validPassword && validUsername) {
     
      const user = {
        email: email,
        password: password,
        username: UserName,
      };
      resetForm();
    }
  };
  const resetForm = () => {
    setEmail("");
    setPassword("");
    setusername("");
    setEmailError(false);
    setPasswordError(false);
    setusernameError(false);
  };
  const isPasswordValid = (password) => {
    // Password validation rules
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]+/;
    return (
      password.length >= 8 &&
      uppercaseRegex.test(password) &&
      numberRegex.test(password) &&
      specialCharRegex.test(password)
    );
  };

  const hasSpecialCharacter = (str) => {
    const specialCharRegex = /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]+/;
    return specialCharRegex.test(str);
  };

  return (
    <main className="body">
      <div className="row pt-5">
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="form_container">
         
            <form
              action="#"
              onSubmit={async (e) => {
                e.preventDefault();
                submitform();
                await onsubmitRegester();
              }}
            >
              <h1 className="header">Sign up</h1>

              {/* email field */}
              <div className={`filed email ${emailError ? "shake error" : ""}`}>
                <div className="input_area">
                  <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <FontAwesomeIcon icon={faEnvelope} className="i" />
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    className="error error_icon "
                  />
                </div>
                <div className="error_txt error">Email cant be blank</div>
              </div>

              {/* username field */}
              <div
                className={`filed password ${
                  usernameError ? "shake error" : ""
                }`}
              >
                <div className="input_area">
                  <input
                    type="text"
                    placeholder="username"
                    value={UserName}
                    onChange={(e) => setusername(e.target.value)}
                  />
                  <FontAwesomeIcon icon={faUser} className="i" />
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    className="error error_icon "
                  />
                </div>
                <div className="error_txt error">username cant be blank</div>
              </div>

              {/* password field */}
              <div
                className={`filed password ${
                  passwordError ? "shake error " : ""
                }`}
              >
                <div className="input_area">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <FontAwesomeIcon icon={faLock} className="i" />
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    className="error_icon error"
                  />
                </div>
                <div className="error_txt error">Password cant be blank</div>
              </div>
              <div className="options">
                <label htmlFor="userRole">Select User Role:</label>
                <select
                  id="userRole"
                  value={role}
                  onChange={(e) => setrole(e.target.value)} // Set the selected role in the state
                >
                  <option value="">Select Role</option>
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                  <option value="Super Admin">Super Admin</option>
                </select>
              </div>
              <input type="submit" value="Login" />
            </form>
            <div className="signin-link">
              Already have an account<a href="/"> Signin</a>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <img
            src={require("../assests/images/background.png")}
            alt="My Image"
            className="image_log_reg  d-none d-md-block"
          />
        </div>
      </div>
    </main>
  );
};

export default Regester;
