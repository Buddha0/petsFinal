import { useEffect, useState } from "react";
import styles from "./nav.module.css";
import { Link } from "react-router-dom";

export default function Nav() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showDropDown, setShowDropDown] = useState(false);

  useEffect(() => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
    // console.log("User from localStorage:", userFromLocalStorage.firstName);
    if (userFromLocalStorage) {
      setLoggedInUser(userFromLocalStorage);
    }
  }, []);

  function handleLogOutClick() {
    localStorage.clear();
    setShowDropDown(false);
    setLoggedInUser(null);
  }

  function handleSettingClick() {
    setShowDropDown(false);
  }

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <img src="../logo.png" className={styles.logo}></img>
          <ul className={styles.ul}>
            <li className={styles.list}>
              <Link to="/" className={styles.text}>
                Home
              </Link>
            </li>
            <li className={styles.list}>
              <Link to="/" className={styles.text}>
                About
              </Link>
            </li>
            <li className={styles.list}>
              <Link to="/allPets" className={styles.text}>
                Available Pets
              </Link>
            </li>

            {!loggedInUser && (
              <>
                <li className={styles.list}>
                  <Link to="/register" className={styles.text}>
                    Register
                  </Link>
                </li>
                <li className={styles.list}>
                  <Link to="/login" className={styles.text}>
                    Login
                  </Link>
                </li>
              </>
            )}

            <li className={styles.list}>
              {loggedInUser && (
                <div className={styles.dropDown_container}>
                  <p
                    className={styles.text}
                    onClick={() => setShowDropDown(!showDropDown)}
                  >
                    {" "}
                    Welcome, {loggedInUser.firstname}{" "}
                  </p>

                  {showDropDown && (
                    <div className={styles.dropDown}>
                      <p
                        className={`${styles.text} ${styles.drop}`}
                        onClick={handleSettingClick}
                      >
                        Settings
                      </p>
                      <p
                        className={`${styles.text} ${styles.drop}`}
                        onClick={handleLogOutClick}
                      >
                        Logout
                      </p>
                    </div>
                  )}
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
