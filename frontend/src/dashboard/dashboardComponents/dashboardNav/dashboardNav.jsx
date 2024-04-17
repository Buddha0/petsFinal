import { useEffect, useState } from "react";
import styles from "./dashboardNav.module.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function DashboardNav() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showDropDown, setShowDropDown] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  useEffect(() => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
    const tokenFromCookies = cookies.token;

    if (userFromLocalStorage && tokenFromCookies) {
      setLoggedInUser(userFromLocalStorage);
    }
  }, [cookies.token]);

  function handleLogOutClick() {
    localStorage.clear();
    setShowDropDown(false);
    setLoggedInUser(null);
    removeCookie("token");
  }

  function handleSettingClick() {
    setShowDropDown(false);
  }

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <Link to="/">
            <img src="../logo.png" className={styles.logo}></img>
          </Link>
          <ul className={styles.ul}>
            <li className={styles.list}>
              <Link to="/" className={styles.text}>
                User dashboard
              </Link>
            </li>
            <li className={styles.list}>
              <Link to="/dashboard" className={styles.text}>
                Home
              </Link>
            </li>
            <li className={styles.list}>
              <Link to="/managepets" className={styles.text}>
                Manage Pets
              </Link>
            </li>
            <li className={styles.list}>
              <Link to="/dashboard" className={styles.text}>
                Manage Users
              </Link>
            </li>
            <li className={styles.list}>
              <Link to="/dashboard" className={styles.text}>
                Post requests
              </Link>
            </li>

            {!cookies.token && (
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
              {loggedInUser && cookies?.token && (
                <div className={styles.dropDown_container}>
                  <p
                    className={styles.text}
                    onClick={() => setShowDropDown(!showDropDown)}
                  >
                    <div className={styles.prof}>
                      Welcome, {loggedInUser?.firstname}
                      {/* Add profile picture icon */}
                      <img
                        src={loggedInUser?.profile[0]?.url}
                        alt="Profile"
                        className={styles.profileIcon}
                      />
                    </div>
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
