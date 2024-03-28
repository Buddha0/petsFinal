import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./register.module.css";

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function formSubmit() {
  
  }

  return (
    <form className={styles.form} onSubmit={formSubmit}>
      <p className={styles.title}>Sign Up</p>
      <p className={styles.message}>
        Signup now and get full access to our app.
      </p>

      <label>
        <input className={styles.input} type="text" placeholder="" required />
        <span>Name</span>
      </label>

      <label>
        <input className={styles.input} type="number" placeholder="" required />
        <span>Number</span>
      </label>
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

      <label>
        <input
          className={styles.input}
          type="password"
          placeholder=""
          required
        />
        <span>Confirm password</span>
      </label>

      <button className={styles.submit} type="submit">
        Register
      </button>

      <p className={styles.signin}>
        Already have an account? <Link to="/login">Signin</Link>
      </p>
    </form>
  );
}
