import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { useCookies } from 'react-cookie';
  import Nav from "../../components/nav/nav";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Customer");
  const [__, setCookie] = useCookies(['token']);
  const navigate = useNavigate();

  
  function formSubmit(e) {
    e.preventDefault();

    const postData = {
      email,
      password,
      role,
    };
   

    axios
      .post("http://localhost:3000/petFinder/user/login", postData)
      .then((response) => {
        const token = response?.data?.jwtToken;
        const user = response?.data?.user;
        setCookie("token", token, {
          path: "/", // Set path to root to make it valid for all paths
          sameSite: "None", // Set SameSite attribute to None for cross-origin requests
          secure: true, // Ensure that cookie is only sent over HTTPS
        });
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      })
      .catch((error) => {
        toast(error?.response?.data?.message,{
          type:"error"
        })
      });

    setEmail("");
    setPassword("");
    setRole("Customer");
  }

  return (
    <>
    <Nav/>
          <ToastContainer  bodyClassName="toastBody" />
          <div className={styles.formSection}>
        <form id="myForm" className={styles.myForm} onSubmit={formSubmit}>
          <img
            src="https://sushirainbow.files.wordpress.com/2020/11/wp-1605470582609.gif"
            className={styles.gif}
          />
          <p className={styles.message}>Hey there! Want to Login?</p>
          <div className={styles.formPadding}>
            
         
          
            <div className={styles.inputDiv}>
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                required
              />
            </div>
            <div className={styles.inputDiv}>
              <input
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
                required
              />
            </div>
        
            <div className={styles.inputDiv}>
              <input
                type="text"
                placeholder="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                autoComplete="off"
                required
              />
            </div>
          </div>

          <div className={styles.btnDiv}>
            <button
              className={`${styles.btn} ${styles.btnSend}`}
              type="submit"
              id="submit_btn"
            >
              Login
            </button>
          </div>
          <p className={styles.signInMessage}>
            Don't Have An Account ? Register
          </p>
        </form>
      </div>
    </>
   
  );
}
