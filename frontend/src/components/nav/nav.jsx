import { useEffect, useState } from "react";
import styles from "./nav.module.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Nav() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showDropDown, setShowDropDown] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
    const tokenFromCookies = cookies.token;

    if (userFromLocalStorage && tokenFromCookies) {
      setLoggedInUser(userFromLocalStorage);

      if (userFromLocalStorage.email.includes("admin@gmail.com")) {
        setIsAdmin(true);
      }
    }
  }, [cookies.token]);

  function handleLogOutClick() {
    localStorage.clear();
    setShowDropDown(false);
    setLoggedInUser(null);
    removeCookie("token");
    setIsAdmin(false);
  }

  function handleSettingClick() {
    setShowDropDown(false);
  }

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <div className={styles.logo_container}>
           
              <h1 className={styles.logo}>Pets </h1>
              <h1 className={styles.logoOrange}>Nepal</h1>
   
          </div>

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

            {!isAdmin && loggedInUser && (
              <li className={styles.list}>
                <Link to="/favourites" className={styles.text}>
                  Favourite
                </Link>
              </li>
            )}

            {isAdmin ? (
              <>
                <li className={styles.list}>
                  <Link to="/dashboard" className={styles.text}>
                    Admin Dashboard
                  </Link>
                </li>
              </>
            ) : (
              ""
            )}

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
