import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "../../components/nav/nav";
import styles from "./register.module.css";

function Register() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("Customer");
  const [__, setCookie] = useCookies(["token"]);

  const navigate = useNavigate();

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

    axios
      .post("http://localhost:3000/petfinder/user/register", formData)
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
        toast(error?.response?.data?.message, {
          type: "error",
        });
      });
  }

  return (
    <>
      <Nav />
      <div className={styles.formSection}>
        <form id="myForm" className={styles.myForm} onSubmit={formSubmit}>
          <ToastContainer bodyClassName="toastBody" />
          <img src="/new.GIF" className={styles.gif} />
          <p className={styles.message}>Hey there! Want to Register?</p>
          <div className={styles.formPadding}>
            <div className={styles.inputDiv}>
              <input
                type="text"
                placeholder="Your First Name"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="off"
                required
              />
            </div>
            <div className={styles.inputDiv}>
              <input
                type="text"
                placeholder="Your Last Name"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="off"
                required
              />
            </div>
            <div className={styles.inputDiv}>
              <input
                type="number"
                placeholder="Your Phone Number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                autoComplete="off"
                required
              />
            </div>
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
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="off"
                required
              />
            </div>
            <div className={styles.selectDiv}>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="">Select Role</option>
                <option value="Customer">Customer</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>

          <div className={styles.btnDiv}>
            <button
              className={`${styles.btn} ${styles.btnSend}`}
              type="submit"
              id="submit_btn"
            >
              Register
            </button>
          </div>
          <p className={styles.signInMessage}>
            Already Have An Account ? <Link to="/login">Sign In</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Register;
