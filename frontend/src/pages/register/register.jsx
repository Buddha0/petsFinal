import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./register.module.css";
import Nav from "../../components/nav/nav";
import axios from "axios";
import { useNavigate } from "react-router-dom"

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const postData = {
    name,
    email,
    password,
  };

  function formSubmit(e) {
    e.preventDefault();

    axios
      .post("http://localhost:3000/petFinder/user/register", postData)
      .then((response) => {
        console.log("Response:", response.data);
        localStorage.setItem("jwtToken",response?.data?.jwtToken)
        localStorage.setItem("user", JSON.stringify(response?.data?.user));
        navigate("/");
      })
      .catch((error) => {
        alert("Something went wrong")
        console.error("Error:", error);
      });

    setName("");
    setEmail("");
    setPassword("");
  }

  return (
    <>
      <Nav />
      <div className={styles.form_container}>
        <form className={styles.form} onSubmit={formSubmit}>
          <p className={styles.title}>Sign Up</p>
          <p className={styles.message}>
            Signup now and get full access to our app.
          </p>

          <label>
            <input
              className={styles.input}
              type="text"
              placeholder=""
              required
              onChange={(e) => setName(e.target.value)}
              value= {name}
            />
            <span>Name</span>
          </label>

          {/* <label>
            <input
              className={styles.input}
              type="number"
              placeholder=""
              required
            />
            <span>Number</span>
          </label> */}

          <label>
            <input
              className={styles.input}
              type="email"
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
              value = {password}
            />
            <span>Password</span>
          </label>

          {/* <label>
            <input
              className={styles.input}
              type="password"
              placeholder=""
              required
            />
            <span>Confirm password</span>
          </label> */}

          <button className={styles.submit} type="submit">
            Register
          </button>

          <p className={styles.signin}>
            Already have an account? <Link to="/login">Signin</Link>
          </p>
        </form>
      </div>
    </>
  );
}
