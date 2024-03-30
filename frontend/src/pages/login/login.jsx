import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const emailRef = useRef();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  function formSubmit(e) {
    e.preventDefault();

    const postData = {
      email,
      password,
    };

    axios
      .post("http://localhost:3000/petFinder/user/login", postData)
      .then((response) => {
        console.log("Response:", response.data);
        setMessage("Login success");
        localStorage.setItem("jwtToken", response?.data?.jwtToken);
        localStorage.setItem("user", JSON.stringify(response?.data?.user));
        navigate("/"); // Navigate to the home page
      })
      .catch((error) => {
        setMessage("Something went wrong");
        console.error("Error:", error);
      });

    setEmail("");
    setPassword("");
  }

  return (
    <form className={styles.form} onSubmit={formSubmit}>
      <p className={styles.title}>Login</p>
      <p className={styles.message}>Welcome back!</p>

      <label>
        <input
          className={styles.input}
          type="email"
          ref={emailRef}
          placeholder=""
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <span>Email</span>
      </label>

      <label>
        <input
          className={styles.input}
          type="password"
          placeholder=""
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <span>Password</span>
      </label>

      <button className={styles.submit} type="submit">
        Login
      </button>

      <p className={styles.signin}>
        Don't have an account? <Link to="/Register">Register</Link>
      </p>

      {message && <p className={styles.message}>{message}</p>}
    </form>
  );
}
