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
        <div className={styles.logo}>Pets nepal</div>
        <div className={styles.navContainer}>
          <ul className={styles.ul}>
            <li className={styles.list}>
              <Link to="/dashboard" className={styles.text}>
                Dashboard
              </Link>
            </li>
            <li className={styles.list}>
              <Link to="/" className={styles.text}>
                Manage Users
              </Link>
            </li>
            <li className={styles.list}>
              <Link to="/managepets" className={styles.text}>
                Manage Pets
              </Link>
            </li>
            <li className={styles.list}>
              <Link to="/login" className={styles.text}>
                Logout
              </Link>
            </li>

            <li className={styles.list}>
              {loggedInUser && cookies?.token && (
                <div className={styles.dropDown_container}>
                  <p
                    className={styles.text}
                    onClick={() => setShowDropDown(!showDropDown)}
                  >
                    {" "}
                    Welcome, {loggedInUser?.firstname}{" "}
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
