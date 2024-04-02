import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./register.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("Customer");

  const navigate = useNavigate();

  const firstNameRef = useRef();

  useEffect(() => {
    firstNameRef.current.focus();
  }, []);

  function formSubmit(e) {
    e.preventDefault();

    const formData = {
      firstname,
      lastname,
      number,
      email,
      password,
      confirmPassword,
      role,
    };
    console.log(formData);
    axios
      .post("http://localhost:3000/petfinder/user/register", formData)
      .then((response) => {
        console.log("Response:", response.data);
        localStorage.setItem("jwtToken", response?.data?.jwtToken);
        localStorage.setItem("user", JSON.stringify(response?.data?.user));
        navigate("/");
      })
      .catch((error) => {
        alert("Something went wrong");
        console.error("Error:", error);
      });
  }

  return (
    <>
      <div className={styles.form_container}>
        <form className={styles.form} onSubmit={formSubmit}>
          <p className={styles.title}>Sign Up</p>
          <p className={styles.message}>
            Signup now and get full access to our app.
          </p>

          <div className={styles.name}>
            <label>
              <input
                ref={firstNameRef}
                className={styles.input}
                type="text"
                placeholder=""
                required
                onChange={(e) => setFirstName(e.target.value)}
                value={firstname}
              />
              <span>First name</span>
            </label>
            <label>
              <input
                className={styles.input}
                type="text"
                placeholder=""
                required
                onChange={(e) => setLastName(e.target.value)}
                value={lastname}
              />
              <span>Last name</span>
            </label>
          </div>

          <label>
            <input
              className={styles.input}
              type="number"
              placeholder=""
              required
              onChange={(e) => setNumber(e.target.value)}
              value={number}
            />
            <span>Number</span>
          </label>

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
              value={password}
            />
            <span>Password</span>
          </label>

          <label>
            <input
              className={styles.input}
              type="password"
              placeholder=""
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
            <span>Confirm password</span>
          </label>

          <label>
            <span>Role:</span>
            <select
              className={styles.select}
              onChange={(e) => setRole(e.target.value)}
              value={role}
            >
              <option value="Customer">Customer</option>
              <option value="Admin">Admin</option>
            </select>
          </label>

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
