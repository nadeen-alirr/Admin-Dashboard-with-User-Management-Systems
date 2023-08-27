import React, { useEffect, useState } from "react";
import "../css/login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faExclamationCircle,
} 
from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [role, setrole] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email validation regex
  const navigate = useNavigate();
  const [Cookies, setCookies] = useCookies("access_token");

  useEffect(() => {
   
    const token = Cookies.access_token;

    console.log("isAuthenticated:", isAuthenticated);
    console.log("userData:", userData);
  }, [isAuthenticated, userData]);

  const onsubmitLogin = async () => {
    console.log("login form submitted!");
    console.log("Email:", email);
    console.log("Password:", password);
    try {
     
      const response = await fetch("http://localhost:1336/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      
      if (response.ok) {
        console.log("Login successful!");
        const data = await response.json();
        setCookies("access_token", data);
       
        const decodedToken = jwt_decode(data.token);
        console.log("Decoded Token:", decodedToken);

       
        console.log("User ID:", decodedToken.userId);
        console.log("User Email:", decodedToken.email);
        console.log("User Role:", decodedToken.role);
        console.log("user name:", decodedToken.username);

        if (decodedToken.role === "User") {
          
          navigate("/profile");
        } else {
         
          navigate("/user");
        }

        localStorage.setItem("access_token", data.token);
      } else {
        
        console.log("Login failed:", response.status);
       
      }
    } catch (error) {
      console.error("Error occurred:", error);
     
    }
  };

  const submitform = () => {
    let valid = true;

    if (!email || !emailRegex.test(email)) {
      setEmailError(true);
      setTimeout(() => setEmailError(false), 1400); 
      valid = false;
    }

    if (!password || !isPasswordValid(password)) {
      setPasswordError(true);
      setTimeout(() => setPasswordError(false), 1400); 
      valid = false;
    }
    if (valid) {
      const user = {
        email: email,
        password: password,
      };
      clearForm();
    }
  };
  const clearForm = () => {
    setEmail("");
    setPassword("");
    setEmailError(false);
    setPasswordError(false);
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
                await onsubmitLogin();
              }}
            >
              <h1 className="header">Sign in</h1>

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
              <input type="submit" value="Signin" />
            </form>
            <div className="signin-link">
              Create account ?<a href="/register">Signup</a>
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
}

export default Login;
