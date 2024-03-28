import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./login.module.css";

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function submitForm(){
    
  }

  return (
    <form className={styles.form} onSubmit={submitForm}>
      <p className={styles.title}>Login</p>
      <p className={styles.message}>Welcome back!</p>

      <label>
        <input className={styles.input} type="email" placeholder="" required />
        <span>Email</span>
      </label>

      <label>
        <input
          className={styles.input}
          type="password"
          placeholder=""
          required
        />
        <span>Password</span>
      </label>

      <Link to="/">
        <button className={styles.submit} type="submit">
          Login
        </button>
      </Link>

      <p className={styles.signin}>
        Don't have an account? <Link to="/Register">Register</Link>
      </p>
    </form>
  );
}
