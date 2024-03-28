import styles from "./nav.module.css";
import { Link } from "react-router-dom";

export default function Nav() {
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
              <Link to="/register" className={styles.text}>
                Register
              </Link>
            </li>
            <li className={styles.list}>
              <Link to="/login" className={styles.text}>
              Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
