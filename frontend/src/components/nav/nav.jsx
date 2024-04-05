import { useEffect, useState } from "react";
import styles from "./nav.module.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";


export default function Nav() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showDropDown, setShowDropDown] = useState(false);
  const [cookies, setCookie,removeCookie] = useCookies(['token']);

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
    removeCookie('token');
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
            <li className={styles.list}>
              <Link to="/favourites" className={styles.text}>
                Favourite
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
              {(loggedInUser && cookies?.token) && (
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
